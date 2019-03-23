import React, { Component } from 'react';



class App extends Component {

  state = {
    mousedown: false,
    mousex: 0,
    mousey: 0,
    currScale: 1,
    currx: 0,
    curry: 0
  }

  componentDidMount() {
    ////////////////////canvas//////////////////////////

    let canvas = document.querySelector('canvas');

    canvas.width = "1000";
    canvas.height = "800";
    canvas.style = "border: 1px solid black";

    let c = canvas.getContext('2d');


    c.fillStyle = "rgb(255,176,59)";
    c.fillRect(10, 10, 1, 1);

    let testData = c.getImageData(10,10,1,1);
    console.log(testData);


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
          })
          scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
        }
        console.log('scrolling up');
      }
      if (e.deltaY > 0) {
        if (this.state.currScale > 1) {
          this.setState({
            currScale: this.state.currScale - 1
          }, () => {
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
          })
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
      this.setState({
        mousex: e.clientX - rect.left,
        mousey: e.clientY - rect.top
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
      currx: currx,
      curry: curry,
      mousex: mousex,
      mousey: mousey
    }, () => {
      currx = Math.floor(this.state.mousex / scale);
      curry = Math.floor(this.state.mousey / scale);
      this.setState({
        currx: currx,
        curry: curry
      })
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
            <canvas>

            </canvas>
          </div>
        </div>
        <div id="testBox">
        </div>
      </div>

    );
  }
}



export default App;
