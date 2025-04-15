import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name}>
        <optio>Selecione uma opção</optio>
      </select>
    </div>
  );
}

export default Select;
