import React, {ReactNode} from 'react';



type FallbackRender = (props: {error: Error | null}) => React.ReactElement

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null }>{
    state = {error: null}

    // when the child component throws an error, this function will receive it and call
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render() {
        const {error} = this.state
        const {fallbackRender, children} = this.props
        if (error) {
            return fallbackRender({error})
        }
        return children
    }
}