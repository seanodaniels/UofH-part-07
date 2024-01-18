const Filter = ({ value, changeThing }) => {
  return (
    <div>
      find countries <input value={value} onChange={changeThing}/>
    </div>
  )
}

export default Filter