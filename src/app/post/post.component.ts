import {Component, OnInit} from '@angular/core';
import {Post} from "./post";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "./popup/popup.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts?: Post[];
  videos: string[] = ["pinguin-walk", "meerkat-standing", "sea-lion-swimming", "family-of-monkeys"];
  width: number = window.innerWidth / 2;
  height: number = (this.width / 16) * 9;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private dialog: MatDialog, private coookieService: CookieService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<Post[]>("http://localhost:8080/api/posts").subscribe((jsonArray) => {
      this.posts = jsonArray;
      this.createVideosContainer();
      this.observeVideo();
      this.volumeControl();   //does not work as intended yet
    });
  }

  openPopUpDialog(post: Post) {
    this.coookieService.set('postID', post.postID);
    this.dialog.open(PopupComponent);
  }

  // you need this method to embed the video. otherwise angular treats video links as strings
  getEmbeddedVideoUrl(post: Post): SafeResourceUrl {
    const videoId = this.getVideoIdFromPost(post);
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  getVideoIdFromPost(post: Post) {
    const lastIndex = post.link.lastIndexOf("/");
    return post.link.slice(lastIndex + 1);
  }

  observeVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {

      // if set to true there is no way to unmute, unless you add the control attribute into the video tag
      video.muted = true;

      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused && !video.ended) {
                  video.play();
                }
              });
            },
            { threshold: 0.85 }
          );
          observer.observe(video);
        });
      }
    });
  }

  //does not work as intended yet
  volumeControl() {
    const videos = document.querySelectorAll("video");
    const volumeSlider = document.getElementById("volumeSlider") as HTMLInputElement;

    videos.forEach((video) => {
      volumeSlider.addEventListener("input", () => {
        video.volume = parseFloat(volumeSlider.value);
      });
    });
  }

  createVideosContainer() {
    let container = document.getElementById('videosContainer');

    this.videos.forEach((videoName) => {
      if (this.videos !== undefined) {
        let videoDiv = document.createElement('div');
        container?.appendChild(videoDiv);

        let videoSrc = `assets/${videoName}.mp4`; //post.link

        let video = document.createElement('video');
        video.width = this.width;
        video.height = this.height;

        let source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';

        video.appendChild(source);
        videoDiv.appendChild(video);

        let volumeControlDiv = document.createElement('div');

        let volumeControlInput = document.createElement('input');
        volumeControlInput.setAttribute('id', 'volumeSlider');
        volumeControlInput.setAttribute('type', 'range');
        volumeControlInput.setAttribute('min', '0');
        volumeControlInput.setAttribute('max', '1');
        volumeControlInput.setAttribute('step', '0.1');
        volumeControlInput.setAttribute('value', '0');

        volumeControlDiv.appendChild(volumeControlInput);
        videoDiv.appendChild(volumeControlDiv);


        //breaks the code above for some reason ( observeVideos() won't work )

        /*post.comments?.forEach((comment) => {
          let commentDiv = document.createElement('div');

          let commentH3 = document.createElement('h3');
          commentH3.setAttribute('class', 'card-text');
          commentH3.textContent = comment.text;

          commentDiv.appendChild(commentH3);
          videoDiv.appendChild(commentDiv);

        });*/
      }
    });
  }
}
