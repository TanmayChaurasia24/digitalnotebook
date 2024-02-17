import React from 'react'
import Notes from './Notes'

const Home = ({mode,togglemode}) => {


  return (
      <>
      <Notes mode={mode} togglemode={togglemode}></Notes>
    </>
  )
}

export { Home };