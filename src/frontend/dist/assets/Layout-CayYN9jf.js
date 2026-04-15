import { r as reactExports, j as jsxRuntimeExports, y as React, bh as clsx, w as cn, bg as useInternetIdentity, bi as useRouterState, q as useLanguage, L as Link } from "./index-CbMjLiSd.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
];
const Sprout = createLucideIcon("sprout", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function useAuth() {
  const { identity, login, clear, isAuthenticated, isLoggingIn } = useInternetIdentity();
  const principal = isAuthenticated && identity ? identity.getPrincipal().toText() : null;
  return {
    isAuthenticated,
    isLoading: isLoggingIn,
    identity,
    principal,
    login,
    logout: clear
  };
}
function Header() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { t, lang, toggle } = useLanguage();
  const NAV_LINKS = [
    { labelEn: "How It Works", labelHi: "कैसे काम करता है", href: "/" },
    { labelEn: "Sectors", labelHi: "क्षेत्र", href: "/#sectors" },
    { labelEn: "Resources", labelHi: "संसाधन", href: "/resources" },
    { labelEn: "Trainings", labelHi: "प्रशिक्षण", href: "/trainings" },
    { labelEn: "AI Quiz", labelHi: "AI क्विज़", href: "/ai-suggest" },
    { labelEn: "Contact", labelHi: "संपर्क", href: "/contact" }
  ];
  const AUTH_NAV = [
    { labelEn: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard" },
    { labelEn: "My Requests", labelHi: "मेरे अनुरोध", href: "/request" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-2 font-display font-bold text-xl text-primary transition-smooth hover:opacity-80",
          "data-ocid": "nav.logo_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 gradient-primary rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rural Biz" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-5", children: [
        NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: link.href,
            className: "text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200",
            "data-ocid": `nav.${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`,
            children: lang === "hi" ? link.labelHi : link.labelEn
          },
          link.href
        )),
        isAuthenticated && AUTH_NAV.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: link.href,
            className: `text-sm font-body font-medium transition-colors duration-200 ${currentPath === link.href ? "text-accent" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `nav.${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`,
            children: lang === "hi" ? link.labelHi : link.labelEn
          },
          link.href
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: toggle,
            className: "flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-body font-semibold border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
            "aria-label": lang === "en" ? "Switch to Hindi" : "Switch to English",
            "data-ocid": "nav.lang_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "en" ? "EN | हिं" : "हिं | EN" })
            ]
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", "data-ocid": "nav.profile_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-sm font-body",
              children: t("Profile", "प्रोफाइल")
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: logout,
              className: "text-sm font-body border-primary/30 text-primary hover:bg-primary/5",
              "data-ocid": "nav.logout_button",
              children: t("Logout", "लॉगआउट")
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: login,
            disabled: isLoading,
            className: "gradient-primary text-white border-0 font-body font-semibold shadow-subtle hover:opacity-90 transition-smooth",
            "data-ocid": "nav.login_button",
            children: isLoading ? t("Connecting…", "जोड़ रहे हैं…") : t("Login", "लॉगिन")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
          onClick: () => setMobileOpen(!mobileOpen),
          "aria-label": mobileOpen ? "Close menu" : "Open menu",
          "data-ocid": "nav.mobile_menu_toggle",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
        }
      )
    ] }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden bg-card border-t border-border shadow-elevated animate-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-4 py-4 gap-1", children: [
      NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: link.href,
          className: "py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
          onClick: () => setMobileOpen(false),
          "data-ocid": `nav.mobile_${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`,
          children: lang === "hi" ? link.labelHi : link.labelEn
        },
        link.href
      )),
      isAuthenticated && AUTH_NAV.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: link.href,
          className: "py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
          onClick: () => setMobileOpen(false),
          "data-ocid": `nav.mobile_${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`,
          children: lang === "hi" ? link.labelHi : link.labelEn
        },
        link.href
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border mt-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: toggle,
            className: "flex items-center gap-2 w-full py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
            "data-ocid": "nav.mobile_lang_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "en" ? "Switch to हिंदी" : "Switch to English" })
            ]
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              className: "w-full justify-start text-sm font-body",
              "data-ocid": "nav.mobile_profile_button",
              children: t("Profile", "प्रोफाइल")
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                logout();
                setMobileOpen(false);
              },
              className: "w-full text-sm font-body border-primary/30 text-primary",
              "data-ocid": "nav.mobile_logout_button",
              children: t("Logout", "लॉगआउट")
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => {
              login();
              setMobileOpen(false);
            },
            disabled: isLoading,
            className: "w-full gradient-primary text-white border-0 font-body font-semibold",
            "data-ocid": "nav.mobile_login_button",
            children: isLoading ? t("Connecting…", "जोड़ रहे हैं…") : t(
              "Login with Internet Identity",
              "इंटरनेट आइडेंटिटी से लॉगिन"
            )
          }
        )
      ] })
    ] }) })
  ] });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { t } = useLanguage();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 gradient-primary rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary", children: "Rural Biz" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: t(
          "Empowering rural entrepreneurs with Skill + Support + System for sustainable growth.",
          "ग्रामीण उद्यमियों को Skill + Support + System के साथ सशक्त बनाना।"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide", children: t("Quick Links", "त्वरित लिंक") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
          { labelEn: "Home", labelHi: "होम", href: "/" },
          {
            labelEn: "Trainings",
            labelHi: "प्रशिक्षण",
            href: "/trainings"
          },
          { labelEn: "Resources", labelHi: "संसाधन", href: "/resources" },
          { labelEn: "Contact", labelHi: "संपर्क", href: "/contact" },
          { labelEn: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard" }
        ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: link.href,
            className: "text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-body",
            children: t(link.labelEn, link.labelHi)
          }
        ) }, link.href)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide", children: t("Sectors", "क्षेत्र") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
          { en: "Farming", hi: "खेती" },
          { en: "Fishery", hi: "मछली पालन" },
          { en: "Poultry", hi: "मुर्गी पालन" },
          { en: "Goat Farming", hi: "बकरी पालन" }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body", children: t(s.en, s.hi) }) }, s.en)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
        "© ",
        year,
        " Rural Biz Platform. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: utmLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-xs text-muted-foreground hover:text-accent transition-colors duration-200 font-body",
          children: "Built with love using caffeine.ai"
        }
      )
    ] })
  ] }) });
}
function Layout({ children, fullWidth = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 ${fullWidth ? "" : ""}`, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Button as B,
  Layout as L,
  Sprout as S,
  X,
  useComposedRefs as a,
  composeRefs as b,
  createLucideIcon as c,
  createSlot as d,
  Slot as e,
  cva as f,
  useAuth as u
};
