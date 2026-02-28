"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";
import { routes, display, person, about, blog, work, home, socials } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";
import type { IconName } from "@/resources/icons";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export const Header = () => {
  const pathname = usePathname() ?? "";

  const navItems = useMemo(
    () => [
      { href: home.path, icon: "home", label: home.label, isRoot: true },
      { href: about.path, icon: "person", label: about.label },
      { href: work.path, icon: "grid", label: work.label },
      { href: blog.path, icon: "book", label: blog.label },
      { href: socials.path, icon: "instagram", label: socials.label },
    ],
    [],
  );

  const enabledNavItems = navItems.filter((item) => routes[item.href as keyof typeof routes]);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: "fixed" }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="brand-weak"
            border="brand-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row
              gap="4"
              vertical="center"
              textVariant="body-default-s"
              suppressHydrationWarning
              className={styles.navInner}
            >
              {enabledNavItems.map((item, index) => (
                <Row key={item.href} vertical="center" gap="4">
                  {index === 1 && <Line vert background="neutral-alpha-medium" height="24" />}

                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon={item.icon as IconName}
                      href={item.href}
                      label={item.isRoot ? undefined : item.label}
                      selected={
                        item.isRoot ? pathname === item.href : pathname.startsWith(item.href)
                      }
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon={item.icon as IconName}
                      href={item.href}
                      selected={
                        item.isRoot ? pathname === item.href : pathname.startsWith(item.href)
                      }
                    />
                  </Row>
                </Row>
              ))}

              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex style={{ fontVariantNumeric: "tabular-nums" }} s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};

export default Header;
