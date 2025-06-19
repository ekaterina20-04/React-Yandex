import { BtnGeneration } from "@/components/ui/generation_btn/BtnGeneration";
import styles from "./GeneratorPage.module.css";
import { GenerationProcess } from "@/components/ui/gener_procces/GenerationProcess";
export const GeneratorPage = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>
          Сгенерируйте готовый csv-файл нажатием одной кнопки
        </div>
        <div className={styles.btn}>
          <BtnGeneration />
          <GenerationProcess />
        </div>
      </div>
    </>
  );
};
