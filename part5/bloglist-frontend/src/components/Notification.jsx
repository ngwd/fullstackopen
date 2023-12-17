import { useAppContext } from "./AppContext"
const Notification = () => {
  const { error, setError } = useAppContext()
  if (error===null) {
    return null
  }
  else {
    setTimeout(() => {
      setError(null)
    }, 4000)
    const name = error.code===0 ? 'notification' : 'error'
    return (
      <div className={name}>
        {error.message}
      </div>
    )
  }
}
export default Notification