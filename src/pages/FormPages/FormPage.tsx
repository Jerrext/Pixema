import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import Button from "src/components/Button/Button";
import styles from "src/pages/FormPages/FormPage.module.scss";
import { ButtonType } from "src/utils/@globalTypes";

type FormPageProps = {
  children: ReactNode;
  titleFormPage: string;
  buttonTitle: string;
  onClick: () => void;
  footerContent?: ReactNode;
  disabledButton: boolean;
};

const FormPage: FC<FormPageProps> = ({
  children,
  titleFormPage,
  buttonTitle,
  onClick,
  footerContent,
  disabledButton,
}) => {
  const { theme } = useThemeContext();
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.formWrapper, {
          [styles.formWrapperLight]: theme === Theme.Light,
        })}
      >
        <h1 className={styles.titlePage}>{titleFormPage}</h1>
        <div className={styles.formContent}>{children}</div>
        <div>
          <Button
            title={buttonTitle}
            onClick={onClick}
            disabled={disabledButton}
            type={ButtonType.Primary}
          />
          <p className={styles.footer}>{footerContent}</p>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
