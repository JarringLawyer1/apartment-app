import { SignIn } from '@clerk/clerk-react'

function Login() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#fafafa'
    }}>
      <SignIn
        routing="hash"
        afterSignInUrl="/manage/dashboard"
      />
    </div>
  )
}

export default Login