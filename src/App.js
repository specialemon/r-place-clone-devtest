import React, { Component } from 'react';
import Widget from './components/Widget';
import Coord from './components/Coord';

class App extends Component {

  state = {
    mousedown: false,
    mousex: 0,
    mousey: 0,
    currScale: 1,
    currx: 0,
    curry: 0,
    widget: [],
    scrollx: 0,
    scrolly: 0
  }

  componentDidMount() {
    ////////////////////canvas//////////////////////////

    let canvas = document.getElementById('mainCanvas');

    canvas.width = "1000";
    canvas.height = "800";
    canvas.style = "border: 1px solid black";

    let c = canvas.getContext('2d');

    c.beginPath();
    c.rect(1, 1, 1000, 800);
    c.fillStyle = "white";
    c.fill();



    c.fillStyle = "rgb(255,176,59)";
    c.fillRect(10, 10, 1, 1);

    let testData = c.getImageData(10, 10, 7, 7).data;
    console.log(testData);


    ///////////////////////widget////////////////////////////////////////
    let widgetScale = document.getElementById('widgetScale');

    widgetScale.style = "transform: scale(20, 20)";


    let widget = document.getElementById('widget');

    widget.width = "7";
    widget.height = "7";

    widget.style = "border: 1px solid black";









    //////////////////////////api////////////////////////////////////

    // axios.get('/api/canvas', (req, res) => {
    //   for(let pixel in res.data.map) {
    //     let coord = pixel.toString().split('-');
    //     let xcoord = parseInt(coord[0]);
    //     let ycoord = parseInt(coord[1]);
    //     let color = [pixel].toString.split(',');
    //     let red = color[0];
    //     let green = color[1];
    //     let blue = color[2];

    //     c.fillStyle= `rgb(${red},${green},${blue})`;
    //     c.fillRect(xcoord, ycoord, 1, 1);
    //   }
    // })

    document.addEventListener('mouseup', e => {
      e.preventDefault();
      this.mouseup();
    });



    ////////////////////////scale div/////////////////////////////

    let container = document.getElementById('container');
    container.style = "overflow: auto";


    let scaleDiv = document.getElementById('scaleDiv');


    /////////////////////////////////////////////////////////////////


    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      if (e.deltaY < 0) {
        if (this.state.currScale < 20) {
          this.setState({
            currScale: this.state.currScale + 1
          }, () => {
            let container = document.getElementById('containment');
            // let offsetx = 1000/this.state.currScale;
            // let offsety = 800/this.state.currScale;
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
            container.scroll(this.state.chx * this.state.currScale, this.state.chy * this.state.currScale);
            this.setState({
              scrollx : this.state.chx * this.state.currScale,
              scrolly : this.state.chy * this.state.currScale
            });
          });
        }
        console.log('scrolling up');
      }
      if (e.deltaY > 0) {
        if (this.state.currScale > 1) {
          this.setState({
            currScale: this.state.currScale - 1
          }, () => {
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
            container.scroll(this.state.chx * this.state.currScale, this.state.chy * this.state.currScale);
            this.setState({
              scrollx : this.state.chx * this.state.currScale,
              scrolly : this.state.chy * this.state.currScale
            });
          });
        }
        console.log('scrolling down');
      }
    });

    canvas.addEventListener('mousedown', e => {
      let rect = e.target.getBoundingClientRect();
      let mousex = e.clientX - rect.left;
      let mousey = e.clientY - rect.top;
      this.mousedown(mousex, mousey);
    });

    canvas.addEventListener('mouseup', e => {
      this.mouseup();
    });

    canvas.addEventListener('mousemove', e => {
      let rect = e.target.getBoundingClientRect();
      let container = document.getElementById('containment');
      this.setState({
        mousex: e.clientX - rect.left,
        mousey: e.clientY - rect.top,
        chx: Math.floor((e.clientX - rect.left) / this.state.currScale),
        chy: Math.floor((e.clientY - rect.top) / this.state.currScale)
      }, () => {
        if(this.state.mousedown && this.state.currScale !== 1) {
          let startx = this.state.currx * this.state.currScale;
          let starty = this.state.curry * this.state.currScale;
          container.scroll(startx - e.offsetX, starty - e.offsetY);
          console.log(e.movementX);
          // if(e.movementX <  0){
          //   this.setState({
          //     scrollx : this.state.mousex + e.offsetX
          //   });
          // }
          // if(e.movementX > 0) {
          //   this.setState({
          //     scrollx : this.state.mousex - e.offsetX
          //   });
          // }
          // if(e.movementY < 0) {
          //   this.setState({
          //     scrolly : this.state.mousey + e.offsetY
          //   });
          // }
          // if(e.movementY > 0) {
          //   this.setState({
          //     scrolly: this.state.mousey + e.offsetY
          //   })
          // }
        }
      })
    });


    ////////////////////////////////////////////////
  }

  mousedown(mousex, mousey) {
    let currx;
    let curry;
    let scale = this.state.currScale;

    this.setState({
      mousedown: true,
      mousex: mousex,
      mousey: mousey
    }, () => {
      currx = Math.floor(this.state.mousex / scale);
      curry = Math.floor(this.state.mousey / scale);
      this.setState({
        currx: currx,
        curry: curry
      }, () => {
        this.setWidgetColor();
      })
    })
  }

  renderWidget() {
    let canvas = document.getElementById('widget');
    let c = canvas.getContext('2d');
    let index = 0;


    for (let y = 1; y < 8; y++) {
      for (let x = 1; x < 8; x++) {
        let red = this.state.widget[index];
        let green = this.state.widget[index + 1];
        let blue = this.state.widget[index + 2];
        index += 4;
        c.fillStyle = `rgb(${red},${green},${blue})`;
        // c.fillStyle = "rgb(255,176,59)";
        c.fillRect(x, y, 1, 1);
      }
    }
  }

  setWidgetColor() {
    let canvas = document.getElementById('mainCanvas');
    let c = canvas.getContext('2d');

    let x = this.state.currx - 3;
    let y = this.state.curry - 3;

    if (x <= 1) {
      x = 1;
    }

    if ( x >= 993) {
      x = 993
    }

    if (y <= 1) {
      y = 1;
    }

    if (y >= 793) {
      y = 793
    }

    let colors = c.getImageData(x, y, 7, 7).data.slice();

    this.setState({
      widget: colors
    }, () => {
      this.renderWidget();
      console.log(this.state.widget);
    })
  }

  mouseup() {
    this.setState({
      mousedown: false
    })
  }

  randomColor() {
    return Math.floor(Math.random() * 255) + 1;
  }


  render() {
    return (
      <div id="container">
        <div id="containment">
          <div className="canvasDiv" id="scaleDiv">
            <canvas id="mainCanvas">
            </canvas>
          </div>
        </div>
        <Coord chx={this.state.chx} chy={this.state.chy} />
        <Widget />
      </div>
    );
  }
}



export default App;