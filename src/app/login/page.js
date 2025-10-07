"use client";
import { useId, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  getAuthErrorMessage,
} from "@/utils/authFunctions";

function LoginForm() {
  const [hasAccount, setHasAccount] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const id = useId();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setMessage(hasAccount ? "Logging in..." : "Creating account...");

    try {
      let result;
      if (hasAccount) {
        result = await signInWithEmail(email, password);
      } else {
        result = await signUpWithEmail(email, password, firstName, secondName);
      }

      setMessage(
        hasAccount ? "Successfully logged in!" : "Account created successfully!"
      );
      clearInputs();
      setTimeout(() => {
        router.push("/user");
      }, 1500);
    } catch (error) {
      console.log(error.code, error.message);
      setMessage(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    setMessage("Logging in with Google...");

    try {
      await signInWithGoogle();
      setMessage("Successfully logged in!");
      clearInputs();
      setTimeout(() => {
        router.push("/user");
      }, 1500);
    } catch (error) {
      console.log(error.code, error.message);
      setMessage(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
    setMessage("");
  }

  function getMessageClass(message) {
    if (message.includes("Successfully")) {
      return styles.success;
    } else if (message.includes("Logging") || message.includes("Creating")) {
      return styles.loading;
    } else {
      return styles.error;
    }
  }

  if (user) {
    return (
      <div
        className={styles.backBanner}
        style={{ maxWidth: "1000px", margin: "2em auto" }}
      >
        <Link href="/">Hai fatto il login con successo. Torna alla home.</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Image
          src="/images/accessbot-logo.svg"
          alt="Il logo di Righi Report, che rappresenta una R che si sfoglia come un libro."
          width={36}
          height={30}
        />
        <h1>{hasAccount ? "Accedi" : "Crea"} al tuo account</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!hasAccount ? (
          <div className={styles.userNames}>
            <label className={styles.label} htmlFor={`firstname-${id}`}>
              Nome:
            </label>
            <input
              className={styles.input}
              type="text"
              id={`firstname-${id}`}
              placeholder="Marco"
              required={true}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              disabled={isLoading}
            />
            <label className={styles.label} htmlFor={`secondname-${id}`}>
              Cognome:
            </label>
            <input
              className={styles.input}
              type="text"
              id={`secondname-${id}`}
              placeholder="Rossi"
              required={true}
              value={secondName}
              onChange={(event) => setSecondName(event.target.value)}
              disabled={isLoading}
            />
          </div>
        ) : (
          ""
        )}
        <label className={styles.label} htmlFor={`email-${id}`}>
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id={`email-${id}`}
          placeholder="marcorossi@gmail.com"
          required={true}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
        />
        <label className={styles.label} htmlFor={`password-${id}`}>
          Password:
        </label>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          id={`password-${id}`}
          placeholder="**********"
          required={true}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
        />
        <label className={styles.showPassword}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
            disabled={isLoading}
          />{" "}
          Mostra password
        </label>
        {message && (
          <div className={`${styles.message} ${getMessageClass(message)}`}>
            {message}
          </div>
        )}
        <button disabled={isLoading}>
          {hasAccount ? "Accedi" : "Registrati"}
        </button>
        <div className={styles.footer}>
          <p className={styles.subtext}>Oppure continua con</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={styles.googleBtn}
          >
            <Image
              src="/images/google-logo.png"
              alt="Logo of the famous Google Company."
              width={30}
              height={30}
            />
            Accedi con google
          </button>
          <p className={styles.register}>
            {hasAccount ? "Non hai ancora un account?" : "Hai già un account?"}
            <button
              type="button"
              onClick={() => setHasAccount(!hasAccount)}
              disabled={isLoading}
            >
              {hasAccount ? "Registrati" : "Accedi"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
