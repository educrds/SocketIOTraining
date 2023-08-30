function FormProgress({  title, currentStep }) {
  let steps = ['', '', '', ''];
  return (
    <div className='f-column g-8 f-align-center'>
      <div className='f-14 col-blue'>{title}</div>
      <div className='f-row g-8'>
        {steps.map((step, index) => (
          <div key={index} className={`progress-status-bar ${index <= currentStep ? 'ok' : ''}`}></div>
        ))}
      </div>
    </div>
  );
}

export default FormProgress;
