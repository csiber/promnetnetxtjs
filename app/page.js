"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="p-5 relative z-10">
        <div className="rounded-full">
          <Link href={"/dashboard"}>
            <Image
              height={400} // Állítsd be a megfelelő méretet
              width={400} // Állítsd be a megfelelő méretet
              className="object-cover justify-center"
              src="/logo-white.png"
              alt="Logo"
            />
          </Link>
          <span className="tooltip">Kattints ide további infókért!</span>
        </div>

        <p className="text-neutral-400 lg:max-w-lg text-center font-RubikRegular mt-4">
          Professzionális webfejlesztés, egyedi megoldások: Neked készítem a legmenőbb weboldalt! <br />
          Kreatív kódolás, ami még a macskádnak is tetszeni fog! <br />
          Bízd rám a weboldalad, és emelkedj ki a tömegből!
        </p>

        <div className="btn-container flex justify-center mt-4">
          <div className="btn border border-neutral-400 rounded-lg p-2 gap-x-5 text-neutral-300">
            <Link href={"/dashboard"}>
              <span>Automatikus átirányítás {countdown} másodperc múlva...</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="wave-container">
        <svg viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
          </defs>
          <use className="wave" xlinkHref="#wave" x="0" y="-2"></use>
          <use className="wave" xlinkHref="#wave" x="0" y="0"></use>
          <use className="wave" xlinkHref="#wave" x="0" y="1"></use>
        </svg>
      </div>
    </div>
  );
}

export default Page;
