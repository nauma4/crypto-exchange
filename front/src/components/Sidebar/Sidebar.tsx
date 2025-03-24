import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/store/AuthorizationProvider";

import Button, { ButtonColors } from "../Button";

import styles from "./sidebar.module.scss";

export interface SidebarMenuPropTypes {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

export const SidebarMenuComponent: React.FC<SidebarMenuPropTypes> = ({
  isOpen = false,
  toggleSidebar,
}): React.ReactElement => {
  const router = useRouter();
  const { isLogin, user } = useAuth();

  return (
    <div className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
      <div className={styles.close} onClick={toggleSidebar}>
        &#x2715;
      </div>
      <div className={styles.content}>
        <div className={styles.menu}>
          <Link
            href="/"
            className={clsx(styles.item, {
              [styles.active]: router.pathname === "/",
            })}
          >
            Обменять
          </Link>
          <Link
            href="/reserve"
            className={clsx(styles.item, {
              [styles.active]: router.pathname === "/reserve",
            })}
          >
            Резерв
          </Link>
          <Link
            href="/parthners"
            className={clsx(styles.item, {
              [styles.active]: router.pathname === "/parthners",
            })}
          >
            Партнерам
          </Link>
          <Link
            href="/faq"
            className={clsx(styles.item, {
              [styles.active]: router.pathname === "/faq",
            })}
          >
            FAQ
          </Link>
        </div>
        <div className={styles.account}>
          {isLogin ? (
            <Button
              color={ButtonColors.red}
              onClick={() => router.push("/profile")}
            >
              {user?.fullName || user?.login || user?.email || "Загрузка..."}
            </Button>
          ) : (
            <>
              <Button
                color={ButtonColors.red}
                icon={<img src="/images/header/reg.svg" />}
                onClick={() => router.push("/register")}
              >
                Регистрация
              </Button>
              <Button
                color={ButtonColors.light}
                icon={<img src="/images/header/login.svg" />}
                onClick={() => router.push("/login")}
              >
                Вход
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
