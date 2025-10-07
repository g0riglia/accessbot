import styles from "./Banner.module.css";
import { Info, AlertTriangle, CheckCircle, AlertOctagon } from "react-feather";

function Banner({ children, type, title = "" }) {
  const Icon =
    type === "info"
      ? Info
      : type === "warning"
      ? AlertTriangle
      : type === "success"
      ? CheckCircle
      : type === "error"
      ? AlertOctagon
      : "";

  return (
    <div className={`${styles.banner} ${styles[type]}`}>
      <Icon className={styles.icon} />
      <div className={styles.text}>
        {title ? <h3>{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

export default Banner;
