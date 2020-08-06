import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import './progress.less'


// 进度条拖动组件

interface Props {
  percent: number,
  percentProgress?: number,
  dragStart?: (move: number) => void,
  dragMove?: () => void,
  dragEnd?: (move: number) => void,
}
interface State {
  offsetWidth: number;
  status: boolean;
  startX: number;
  left: number;
}

class Progress extends React.Component<Props, State> {
  private static propTypes = {
    percent: PropTypes.number.isRequired,
    percentProgress: PropTypes.number,
    dragStart: PropTypes.func, // 拖拽开始事件
    dragMove: PropTypes.func, // 拖拽中事件
    dragEnd: PropTypes.func // 拖拽结束事件
  }
  private mmProgress: any
  private mmProgressInner: any
  private mmPercentProgress: any

  constructor(props: Props) {
    super(props)
    this.state = {
      offsetWidth: 0,
      status: false, // 是否可拖动
      startX: 0, // 记录最开始点击的X坐标
      left: 0 // 记录当前已经移动的距离
    }
  }

  public render() {
    const { offsetWidth } = this.state;
    return (
      <div className="mmProgress" ref={e => this.mmProgress = e} onClick={this.barClick}>
        <div className="mmProgress-bar" />
        <div className="mmProgress-outer" ref={e => this.mmPercentProgress = e} />
        <div
          className="mmProgress-inner"
          ref={e => this.mmProgressInner = e}
          style={{ width: `${offsetWidth}px` }}
        >
          <div
            className="mmProgress-dot"
            onMouseDown={this.barDown}
            onTouchStart={this.barDown}
          />
        </div>
      </div>
    )
  }

  public componentDidMount() {
    this.mmProgress = ReactDOM.findDOMNode(this.refs.mmProgress)
    this.mmProgressInner = ReactDOM.findDOMNode(this.refs.mmProgressInner)
    this.bindEvents()
  }

  public componentWillReceiveProps(nextProps) {
    if (!this.state.status && nextProps.percent !== this.props.percent) {
      this.setState({
        offsetWidth: this.mmProgress.clientWidth * nextProps.percent
      })
    }
  }

  public componentWillUnmount() {
    this.unbindEvents()
  }

  // 添加绑定事件
  private bindEvents() {
    document.addEventListener('mousemove', this.barMove)
    document.addEventListener('mouseup', this.barUp)

    document.addEventListener('touchmove', this.barMove)
    document.addEventListener('touchend', this.barUp)
  }

  // 移除绑定事件
  private unbindEvents() {
    document.removeEventListener('mousemove', this.barMove)
    document.removeEventListener('mouseup', this.barUp)

    document.removeEventListener('touchmove', this.barMove)
    document.removeEventListener('touchend', this.barUp)
  }

  // 点击事件
  private barClick = e => {
    if(!this.mmProgress){
      return;
    }
    const rect = this.mmProgress.getBoundingClientRect()
    const offsetWidth = Math.min(rect.width, Math.max(0, e.clientX - rect.left))
    this.setState({ offsetWidth })
    if (this.props.dragEnd) {
      this.props.dragEnd(offsetWidth / this.mmProgress.clientWidth)
    }
  }

  // 鼠标/触摸开始事件
  private barDown = e => {
    if(!this.mmProgressInner){
      return;
    }
    this.setState({
      status: true,
      startX: e.clientX || e.touches[0].pageX,
      left: this.mmProgressInner.clientWidth
    })
    // console.log(e.nativeEvent)
    // console.log(this)
  }
  // 鼠标/触摸移动事件
  private barMove = e => {
    if (this.state.status) {
      const endX = e.clientX || e.touches[0].pageX;
      const dist = endX - this.state.startX;
      const offsetWidth = Math.min(
        this.mmProgress.clientWidth,
        Math.max(0, this.state.left + dist)
      )
      this.setState({ offsetWidth })
      // console.log(offsetWidth)
    }
  }

  // 鼠标/触摸释放事件
  private barUp = () => {
    // 避免打开Playing组件时触发
    if (this.state.status) {
      this.setState({
        status: false
      })
      if (this.props.dragEnd) {
        this.props.dragEnd(this.state.offsetWidth / this.mmProgress.clientWidth)
      }
    }
  }
}

export default Progress
