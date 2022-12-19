import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as d3 from 'd3';
//import './style.css';

function renderAttr(attr) {
  Object.keys(attr).forEach(key => {
    if (key.indexOf('on') === 0) {
      attr[key] = new Function('e', attr[key]);
    }
  });
  return attr;
}

let key = 1;

function render(data) {
  data = [].concat(data);
  const elts = [];
  data.forEach(d => {
    if (d === undefined) {
      return;
    }
    switch(d.type) {
    case 'b':
      elts.push(<b key={key++}>{render(d.elts)}</b>);
      break;
    default:
      elts.push(<text key={key++} x="10" y="50">{d}</text>);
      break;
    }
  });
  return elts;
}

const Form = () => {
  const [ elts, setElts ] = useState([]);
  const router = useRouter();
  const { type, data } = router.query;
  useEffect(() => {
    if (data === undefined) {
      return;
    }
    console.log("Form() data=" + data);
    d3.select("svg").html("");
    const { url } = JSON.parse(data);
    console.log("Form() url=" + url);
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
    <div key={key++} id="graffiti">
      <svg key={key++} height="100">
        {elts}
      </svg>
    </div>
  );
}

export default Form;
