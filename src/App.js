import React, { Component } from 'react';

const campfireStory = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3';
const bootingUp = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTrack: null,
      player: "stopped",
      duration: null,
      currentTime: null
    }
    this.getTime = this.getTime.bind(this);
  }

  getTime(time) {
    if (!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
  }


  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", e => { })
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Campfire story":
          track = campfireStory
          break;
        case "Booting up":
          track = bootingUp
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({
          player: "playing"
        })
      }
    }

    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause()
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({
          selectedTrack: null
        })
      } else if (this.state.player === "playing" && prevState === "paused") {
        this.player.play()
      }
    }

  }

  render() {
    const currentTime = this.getTime(this.state.currentTime);
    const duration = this.getTime(this.state.durtion);



    const list = [
      {
        id: 1,
        title: "Campfire story"
      },
      {
        id: 2,
        title: "Booting up"
      }
    ].map(item => (
      <li
        key={item.id}
        onClick={() => this.setState({
          selectedTrack: item.title
        })}
      >
        {item.title}
      </li>
    ))
    return (
      <>
        <h1>My little player</h1>
        <ul>{list}</ul>
        <div>
          {this.state.player === "paused" &&
            (<button
              onClick={() => {
                this.setState({
                  player: "playing"
                })
              }}
            >
              Play
            </button>)
          }
          {this.state.player === "playing" &&
            <button
              onClick={() => {
                this.setState({
                  player: "paused"
                })
              }}
            >
              Pause
            </button>
          }
          {this.state.player === "playing" || this.state.player === "paused" ?
            (
              <>
                <button
                  onClick={() => {
                    this.setState({
                      player: "stopped"
                    })
                  }}
                >
                  Stop
                </button>
                <div>
                  {currentTime} / {duration}
                </div>
              </>
            ) : ("")
          }
        </div>
        <audio src="" ref={ref => this.player = ref}></audio>
      </>
    )
  }
}

export default App;
