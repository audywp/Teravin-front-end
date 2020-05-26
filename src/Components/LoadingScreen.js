import React from 'react'
import { Spinner } from 'reactstrap'

export default function LoadingScreen() {
  return (
    <div className="loadingComponent">
      <Spinner color="primary" />
    </div>
  )
}
