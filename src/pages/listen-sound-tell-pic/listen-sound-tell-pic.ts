import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListenSoundTellPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listen-sound-tell-pic',
  templateUrl: 'listen-sound-tell-pic.html',
})
export class ListenSoundTellPicPage {
  over: any = false;

  questions: any = [];
  question: any = {
    word: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    selected: '',
    audioSrc: ''
  };

  selected: any = '-';
  index: any = 0;
  score: any = 0;
  time: any = 3000;
  TOF: any = false;
  timer: any;
  results: any = [];
  selectedword: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.questions = this.navParams.get('exam4');
    console.log(this.questions);
  }

  ionViewDidLoad() {
    this.question = this.questions[0];
    this.timego();
  }

  ionViewDidEnter() {
    let audio = document.getElementById("word-audio") as HTMLAudioElement;
    audio.play();
  }
  timego() {

    this.timer = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.timer);
        for (let j = this.index; j < 10; j++) {
          let result = {
            tSrc: this.questions[j].selected,
            tValue: this.questions[j].word,
            ySrc: '../../assets/imgs/black.png',
            yValue: '-',
            TOF: false,
            audioSrc: this.questions[j].audioSrc
          };

          this.results.push(result);
        }
        this.over = true;
      }
    }, 1000);

  }

  select1() {
    this.selected = this.question.option1;
    document.getElementById('option1').style.borderColor = 'orange';
    document.getElementById('option2').style.borderColor = '#fff';
    document.getElementById('option3').style.borderColor = '#fff';
    document.getElementById('option4').style.borderColor = '#fff';
  }
  select2() {
    this.selected = this.question.option2;
    document.getElementById('option1').style.borderColor = '#fff';
    document.getElementById('option2').style.borderColor = 'orange';
    document.getElementById('option3').style.borderColor = '#fff';
    document.getElementById('option4').style.borderColor = '#fff';
  }
  select3() {
    this.selected = this.question.option3;
    document.getElementById('option1').style.borderColor = '#fff';
    document.getElementById('option2').style.borderColor = '#fff';
    document.getElementById('option3').style.borderColor = 'orange';
    document.getElementById('option4').style.borderColor = '#fff';
  }
  select4() {
    this.selected = this.question.option4;
    document.getElementById('option1').style.borderColor = '#fff';
    document.getElementById('option2').style.borderColor = '#fff';
    document.getElementById('option3').style.borderColor = '#fff';
    document.getElementById('option4').style.borderColor = 'orange';
  }
  nextQuestion() {
    if (this.question.selected == this.selected) {
      this.score += 10;
      this.TOF = true;
    }
    else if (this.question.selected == this.selected) {
      this.score += 10;
      this.TOF = true;
    }
    else if (this.question.selected == this.selected) {
      this.score += 10;
      this.TOF = true;
    }
    else if (this.question.selected == this.selected) {
      this.score += 10;
      this.TOF = true;
    }

    if (this.selected == '-') {
      this.selectedword = '-';
    }
    else {
      let start = this.selected.indexOf('/', 20) + 1;
      let end = this.selected.indexOf('.png');
      this.selectedword = this.selected.substring(start, end);
      console.log(this.selectedword);
    }
    let result = {
      tSrc: this.question.selected,
      tValue: this.question.word,
      ySrc: (this.selected == '-') ? '../../assets/imgs/black.png' : this.selected,
      yValue: (this.selectedword == '-') ? '-' : (this.selectedword),
      TOF: this.TOF,
      audioSrc: this.question.audioSrc
    };
    this.results.push(result);
    this.selectedword = '-';
    this.selected = '-';
    this.index++;
    if (this.index < 10) {
      this.selected = '-';
      this.question = this.questions[this.index];
      document.getElementById('option1').style.borderColor = '#fff';
      document.getElementById('option2').style.borderColor = '#fff';
      document.getElementById('option3').style.borderColor = '#fff';
      document.getElementById('option4').style.borderColor = '#fff';
      this.TOF = false;
      setTimeout(() => {
        let audio = document.getElementById("word-audio") as HTMLAudioElement;
        audio.play();
      }, 500);
    }
    else {
      this.over = true;
      clearInterval(this.timer);
      // console.log(this.results);
    }
  }
  playAudio() {
    document.getElementById("play").style.visibility="hidden";
    setTimeout(()=>{
      document.getElementById("play").style.visibility="visible";
    },100);
    let audio = document.getElementById("word-audio") as HTMLAudioElement;
    audio.play();
  }
  playResultAudio(i) {
    (document.getElementsByClassName("result-item")[i] as HTMLElement).style.backgroundColor = "#ff6b00";
    setTimeout(() => {
      (document.getElementsByClassName("result-item")[i] as HTMLElement).style.backgroundColor = "#fff";
    }, 1000);
    let audio = document.getElementsByClassName("word-audio")[i] as HTMLAudioElement;
    audio.play();
  }
}
