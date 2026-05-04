import { Component } from 'react'

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Kai Nani app error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f7f3eb] px-6 py-20 text-[#2f2a25]">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#d7caba] bg-white/80 p-8 shadow-[0_20px_60px_rgba(47,42,37,0.08)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-[#857363]">Kai Nani</p>
            <h1 className="mt-3 font-serif text-4xl">The resort page is loading.</h1>
            <p className="mt-4 leading-relaxed text-[#5a5148]">
              If the page stays blank, please hard refresh the browser or let me know and I’ll fix the runtime error immediately.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default AppErrorBoundary
