import '../index.css';

function FormSenha() {
  return (
    <>
      <div className='f-column g-16'>
        <div className='f-column g-8 f-align-center'>
          <div className='f-14 col-blue'>Senha</div>
          <div className='f-row g-8'>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar ok'></div>
          </div>
        </div>
        <div className='f-column g-16 h-100 f-align-center'>
          <div className='f-100px col-blue'>523</div>

          <div className='f-row g-8'>
            <div className='square w-100'>
              <div className='f-column g-8 col-blue f-align-center'>
                <div className='f-bold'>Na sua frente</div>
                <div className='f-20'>5</div>
              </div>
            </div>
            <div className='square w-100'>
              <div className='f-column g-8 col-blue f-align-center'>
                <div className='f-bold'>Tempo médio de atendimento</div>
                <div className='f-20'>
                  25 <span className='f-14'>min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormSenha;
