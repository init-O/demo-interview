import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

const LoadingScreen = () => {
  return (
      <div className="mt-2 mb-2 px-2">
        <LinearProgress />
      </div>
  )
}

export default LoadingScreen
