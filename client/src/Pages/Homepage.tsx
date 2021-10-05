import React, { useContext } from 'react';
import { myContext } from './Context';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const ctx = useContext(myContext);
  const APIkey = process.env.GAMESPOTKEY;
  const gameSpotNews = () => {
    axios
      .get(`http://www.gamespot.com/api/articles/?api_key=${APIkey}`, {
        withCredentials: false,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <h1 onClick={gameSpotNews}>news</h1>
      <Carousel className="Carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
