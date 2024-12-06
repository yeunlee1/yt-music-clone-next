import React from 'react';

const page = async (props: any) => {
  return <div> playlist {props.searchParams.list}</div>;
};

export default page;
