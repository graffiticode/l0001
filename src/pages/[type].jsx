import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as d3 from 'd3';
//import './style.css';

function isNonNullObject(obj) {
  return (typeof obj === "object" && obj !== null);
}

function renderAttr(attr) {
  Object.keys(attr).forEach(key => {
    if (key.indexOf('on') === 0) {
      attr[key] = new Function('e', attr[key]);
    }
  });
  return attr;
}

let ticket = 1;

function renderJSON(data, depth = 0) {
  if (isNonNullObject(data)) {
    const keys = Object.keys(data);
    const x = depth * 15;
    const elts = keys.map(key => {
      const val = renderJSON(data[key], depth + 1);
      return <tspan key={ticket++} x={x} dy="1rem">{key}: {val}</tspan>
    });
    return elts;
  } else {
    return data;
  }
}

function render(data) {
  data = [].concat(data);
  const elts = [];
  data.forEach(d => {
    if (d === undefined) {
      return;
    }
    switch(d.type) {
    case 'b':
      elts.push(<b key={ticket++}>{render(d.elts)}</b>);
      break;
    default:
      if (isNonNullObject(d)) {
        d = renderJSON(d);
      }
      elts.push(<text key={ticket++} x="5" y="15" fontFamily="monospace">{d}</text>);
      break;
    }
  });
  return elts;
}

const Form = () => {
  const [ elts, setElts ] = useState([]);
  const [ width, setWidth ] = useState(100);
  const [ height, setHeight ] = useState(100);
  const router = useRouter();
  const { type, data } = router.query;
  useEffect(() => {
    const bBox = d3.select("svg").node()?.getBBox();
    const width = Math.trunc(bBox?.width);
    const height = Math.trunc(bBox?.height);
    if (width !== 0 && height !== 0) {
      setWidth(2 * width);
      setHeight(2 * height);
    }
  });
  useEffect(() => {
    if (data === undefined) {
      return;
    }
    d3.select("svg").html("");
    const { url } = JSON.parse(data);
    (async () => {
      const resp = await fetch(
        url,
        {
          headers: {'Content-Type': 'application/json'},
        }
      );
      const { data } = await resp.json();
      if (data === undefined) {
        return;
      }
      try {
        setElts(render(data));
      } catch (x) {
        // Bad data.
        console.log("Bad data in query: " + x);
      }
    })();
  }, [data]);
  return (
    <div key={ticket++} id="graffiti">
      <svg key={ticket++} x="10" width={width + 5} height={height + 15}>
        {elts}
      </svg>
    </div>
  );
}

export default Form;
