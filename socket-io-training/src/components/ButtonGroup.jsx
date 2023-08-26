const ButtonGroup = ({ onClickNext, onClickBack }) => {
  return (
    <div className='f-row g-8 f-justify-center'>
      <button className='btn-default btn-ghost' onClick={onClickBack}>
        Voltar
      </button>
      <button className='btn-default btn-primary' onClick={onClickNext}>
        Próximo<i className='fa-solid fa-arrow-right'></i>
      </button>
    </div>
  );
};
export default ButtonGroup;
