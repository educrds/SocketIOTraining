const InputRadio = ({ checked, onChange, name, label, textarea }) => {
  return (
    <div className='f-column g-4'>
      <div className='f-row'>
        <span className='w-100'>{label}</span>
        <div className='f-row f-between'>
          <div className='f-row g-4 f-align-center f-justify-end'>
            <input type='radio' value={true} checked={checked === true} name={name} onChange={onChange} />
            <label htmlFor=''>Sim</label>
          </div>
          <div className='f-row g-4 f-align-center f-justify-end'>
            <input type='radio' value={false} checked={checked === false} name={name} onChange={onChange} />
            <label htmlFor=''>Não</label>
          </div>
        </div>
      </div>
      {/* {textarea && (
        <div className='f-column'>
          <textarea name='' id='' rows='2' placeholder='Cite aqui...'></textarea>
        </div>
      )} */}
    </div>
  );
};

export default InputRadio;
