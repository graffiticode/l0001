import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import './style.css';

function renderAttr(attr) {
  Object.keys(attr).forEach(key => {
    if (key.indexOf('on') === 0) {
      attr[key] = new Function('e', attr[key]);
    }
  });
  return attr;
}

function renderElts(data) {
  data = [].concat(data);
  const elts = [];
  let key = 1;
  data.forEach(d => {
    if (d === undefined) {
      return;
    }
    switch(d.type) {
    case 'b':
      elts.push(<b key={key++}>{renderElts(d.elts)}</b>);
      break;
    default:
      elts.push(d);
      break;
    }
  });
  return elts;
}

const Form = () => {
  const router = useRouter();
  const { type, data } = router.query;
  const [ elts, setElts ] = useState([]);
  useEffect(() => {
    try {
      if (data) {
        setElts(renderElts(JSON.parse(data)));
      }
    } catch (x) {
      // Bad data.
      console.log("Bad data in query: " + x);
    }
  }, [data]);
  return (
    <div>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      {elts}
    </div>
  );
}

export default Form;
