import styles from "./styles.css";

import("../images/logo.jpg").then(logo => {
  document.body.appendChild(logo());
});

module.exports = () => "Nice to meet you!";
