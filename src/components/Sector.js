import React, { Component } from 'react'
import {getCircleX, getCircleY, getX, getY, getAngleBetween} from '../utils/calculations'

class Sector extends Component{

  getSectorData(r, initialAngle, inc, centerX = r, centerY = r){
    const x1 = getCircleX(r, initialAngle)
    const y1 = getCircleY(r, initialAngle)
    const x2 = getCircleX(r, initialAngle + inc)
    const y2 = getCircleY(r, initialAngle + inc)

    return `M${centerX},${centerY} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} z`
  }

  renderSector({radius, initialAngle, increment, isHovered}){
    const fill = isHovered ? '#30C0FF' : '#E0E0E0'

    return (
      <path
        style={ {transition: 'fill 150ms ease'} }
        d={ this.getSectorData(radius, initialAngle, increment) }
        fill={ fill }
        stroke='#CECECE'
        strokeWidth='1'
      />
    )
  }

  renderImage({radius, initialAngle, increment, item}){
    return (
      <image
        style={ {color: '#404040'} }
        transform={ `translate(-${ radius * 0.1 } -${ radius * 0.1 })` }
        width={ `${radius * 0.2}px` }
        height={ `${radius * 0.2}px` }
        x={ getX(radius, (radius * 0.78), getAngleBetween(initialAngle, initialAngle + increment)) }
        y={ getY(radius, (radius * 0.78), getAngleBetween(initialAngle, initialAngle + increment)) }
        xlinkHref={ item.image }
      />
    )
  }

  render(){
    const { onHoverChange, item } = this.props

    return (
      <a
        onMouseEnter={ onHoverChange }
        onMouseLeave={ onHoverChange }
        href={ item.action }
      >
        { this.renderSector(this.props) }
        { this.renderImage(this.props) }
      </a>
    )
  }
}

Sector.propTypes = {
  increment: React.PropTypes.number,
  initialAngle: React.PropTypes.number,
  isHovered: React.PropTypes.bool,
  item: React.PropTypes.shape({
    action: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
    image: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  onHoverChange: React.PropTypes.func,
  radius: React.PropTypes.number,
}

export default Sector