"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email === "user@user.com" &&
      password === "user") {
      router.push("/pages/oldTimer");
      return;
    }
    alert("Неправильний логін або пароль.");
  }



  return (
    <div className="wrapper">
      <section className="subscribe-section">
        <p>Щоб увійти заповніть поля:</p>
        <form className="subscribe-form" onSubmit={(e) => { handleSubmit(e) }}>
          <input
            type="email"
            id="email"
            placeholder="Ваша електронна пошта"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
          />

          <button type="submit">Увійти</button>
        </form>
      </section>
    </div>
  );
}
