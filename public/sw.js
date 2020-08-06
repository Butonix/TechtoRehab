if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let a = Promise.resolve();
      return (
        i[e] ||
          (a = new Promise(async (a) => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = a);
            } else importScripts(e), a();
          })),
        a.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    a = (a, i) => {
      Promise.all(a.map(e)).then((e) => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(a) };
  self.define = (a, c, s) => {
    i[a] ||
      (i[a] = Promise.resolve().then(() => {
        let i = {};
        const t = { uri: location.origin + a.slice(1) };
        return Promise.all(
          c.map((a) => {
            switch (a) {
              case "exports":
                return i;
              case "module":
                return t;
              default:
                return e(a);
            }
          })
        ).then((e) => {
          const a = s(...e);
          return i.default || (i.default = a), i;
        });
      }));
  };
}
define("./sw.js", ["./workbox-0ca493ec"], function (e) {
  "use strict";
  importScripts(),
    importScripts(
      "https://runtime.imagekit.io/ttr/v1/js/network-based-adaption.js?v=" +
        new Date().getTime()
    ),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/401.svg", revision: "05071e1a036bcfb409ee0e600ea6e050" },
        { url: "/403.svg", revision: "4f8c06543c1a778e85f40c324ea4bebf" },
        { url: "/404.svg", revision: "679514a9924bbdac8289c4f769f6f9d0" },
        { url: "/500.svg", revision: "6858ee75f4775975a4b746833f4e4287" },
        { url: "/503.svg", revision: "cd2d2268c819bce812938f5c475a328a" },
        { url: "/504.svg", revision: "455ffb2eedc87f19c3d8de6536ce8590" },
        { url: "/Blank.svg", revision: "89c8176da481ce8caedeb3a898df9441" },
        {
          url: "/Confirm-token.svg",
          revision: "47701da526cc17061c43d678ad4dc280",
        },
        { url: "/Empty.svg", revision: "7450fcee6fe5b41a9601989a35d5bb7b" },
        { url: "/Login-2.svg", revision: "e790c59578ba43f07a6c37d14395fe9e" },
        {
          url: "/Login-back.svg",
          revision: "c7d2f31625aba50e4567ad88a1b2f652",
        },
        {
          url: "/Login-front.svg",
          revision: "44a47fb253706e49da7d81c2160c745a",
        },
        { url: "/Login.svg", revision: "06b76e4aeb300da83978b54bfb959fdf" },
        { url: "/TTR-DARK.svg", revision: "cc6ece5f2f7426247a2b2f0b03822ae6" },
        { url: "/TTR-LIGHT.svg", revision: "a291a31036a8548290367403057186a4" },
        {
          url:
            "/_next/static/chunks/06a38950beea49b86015f1b9a3265d8c0f47bfe6.d293c05c9ce0203792d4.js",
          revision: "621e79e792658e1e0d1cf893cedeaa33",
        },
        {
          url:
            "/_next/static/chunks/21eefcaf60819c4d93e431e9f3734b79ccbb0055.33cd2ec7525e646259d6.js",
          revision: "256e8329bb5175c46dc25713e5d5959d",
        },
        {
          url: "/_next/static/chunks/223.c646daebb10882493e73.js",
          revision: "8eec6ce6d7b71e0eb4dee1c10135834e",
        },
        {
          url:
            "/_next/static/chunks/2f3498e30d004832af6a53fec44b043da37f4527.b49b6330088bca868585.js",
          revision: "1c176cbdb57b08d1c2a637f826b10ef0",
        },
        {
          url: "/_next/static/chunks/3975bccd.e586089e289fd05571f7.js",
          revision: "03be9f3d06dd981097fc49634c3f5c6d",
        },
        {
          url:
            "/_next/static/chunks/523233ede7818ff000c5964bcc430b910da18655.cde3d9f0948efa159d09.js",
          revision: "085c604b71add00be6267787e2167342",
        },
        {
          url:
            "/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.c4c4b8289ef0e30c0164.js",
          revision: "83751dded37bbc8870381b4c533cece2",
        },
        {
          url:
            "/_next/static/chunks/720c2d13cb0344bd0f9c01ee5178784cc7650140.f0421aa14129b1f3f6e6.js",
          revision: "5aea967a21542f2a296455a5a7242d9a",
        },
        {
          url:
            "/_next/static/chunks/7b7dddb439b9d2d67ad1a9c25614122c80d4735a.b44c305c1971ccf61495.js",
          revision: "291d8496a07eb2fdd20ef304228f7ed2",
        },
        {
          url:
            "/_next/static/chunks/85edf8fdc88e939553a740f1e43ead3e0735600e.63f6d12f174fb3e0e5f5.js",
          revision: "93a7145cbc59739487cf771a6be22e3d",
        },
        {
          url:
            "/_next/static/chunks/9297c24cb4fc07967da1911ac2d19b3dbe27df32.fb8f0e425d37fc402ce8.js",
          revision: "30c7eff0cfbd0cbd98dd8de2aaaf8d5b",
        },
        {
          url:
            "/_next/static/chunks/9805ad84b23c5dccf0dc33e2e3db9c9e8a7372a4.49ae04511dd6611c626d.js",
          revision: "d5866d35ffa14bc834740be6aa9873b8",
        },
        {
          url: "/_next/static/chunks/commons.0d2d67284fc219f38eae.js",
          revision: "b1e5c1ac5459c8fc67663a4482b33fe7",
        },
        {
          url:
            "/_next/static/chunks/d6b5a0c76830dc3c5761631e8a602b77f8e86bdd.c82c56ce8ff958e2e855.js",
          revision: "092902c6487f7ac62f33141cf0b86652",
        },
        {
          url:
            "/_next/static/chunks/d867a95c9ecf085f0b379dfd23af1d9c64fe459a.f1f2bef1b5ba0077da13.js",
          revision: "4fd502af2ec5e931f8ded6fec87e6bf5",
        },
        {
          url:
            "/_next/static/chunks/e2d106312e3731331a990dfa9323addaa5bba96b.c281316aa7eaebf45153.js",
          revision: "20c269fc8891d472383a8c7da4c4825b",
        },
        {
          url: "/_next/static/chunks/f96f2766.c6b1e263373239d73cd4.js",
          revision: "197a2051317b6dd9cf29979e5e96eb5c",
        },
        {
          url: "/_next/static/chunks/framework.21e86a6ca33c219df566.js",
          revision: "f8b1a62a1c400a2e2aea79113ddb38b1",
        },
        {
          url: "/_next/static/chunks/main-b40ac810dc301dce6fc4.js",
          revision: "d7a83e2e714558e379ad26892ffb79b4",
        },
        {
          url: "/_next/static/chunks/pages/404-fa5654294dc79ef52de6.js",
          revision: "035e713254ae2bcf92e4755b7b3d061a",
        },
        {
          url: "/_next/static/chunks/pages/_app-b65ea5262f5a9721818e.js",
          revision: "bc7b00baa8950bf06782ac7f79d46490",
        },
        {
          url: "/_next/static/chunks/pages/_error-f8acf05bdea638ce9ddc.js",
          revision: "0b0e07e3b156c7d30e2c333b65c22c53",
        },
        {
          url: "/_next/static/chunks/pages/admin-edab9f7c4ddb6937edb5.js",
          revision: "1abf041e29b498130da94a84475ddf6c",
        },
        {
          url:
            "/_next/static/chunks/pages/admin/%5BadminRoute%5D-256ae202db904f3f2e3c.js",
          revision: "c3e5cfe80622c198d7df0dacf016192c",
        },
        {
          url:
            "/_next/static/chunks/pages/article/%5Bcategory%5D/%5Btopic%5D/%5BarticleTitle%5D-160b91fcc2a38f7fc6af.js",
          revision: "ac76620c3b13b91fe023c7a3d13e3aeb",
        },
        {
          url:
            "/_next/static/chunks/pages/article/edit/%5BarticleName%5D-b88679c073a7f49096cc.js",
          revision: "7002439b78a1d9286eb93e35b913ea4d",
        },
        {
          url: "/_next/static/chunks/pages/categories-4a1acaba3e283edac9f9.js",
          revision: "25409ceecb63159c0156d871e848c695",
        },
        {
          url:
            "/_next/static/chunks/pages/category/%5BcategorySlug%5D-906623f3dc38e8c4981f.js",
          revision: "705639da7de28842c02b4e2e33baada9",
        },
        {
          url: "/_next/static/chunks/pages/create-9fefe8a305b652fb0465.js",
          revision: "65db90ff311074a6e75b91741d9f6dde",
        },
        {
          url:
            "/_next/static/chunks/pages/create/article-b55cbab79693e0e839c1.js",
          revision: "e3319ada45f5b78a9fd06eb14141e4a1",
        },
        {
          url:
            "/_next/static/chunks/pages/create/published-1ce0894846df6db1339d.js",
          revision: "5aeae60fe25bcc9273327d2700afa7e1",
        },
        {
          url:
            "/_next/static/chunks/pages/forgot-password/%5BuserId%5D-dd5ac0ce81a4692ef165.js",
          revision: "34b2c29b684b535323abd0003bb284a5",
        },
        {
          url: "/_next/static/chunks/pages/get-started-323004ce5b82b9dd7506.js",
          revision: "39c97b1311ee9ecc799e068e906394ed",
        },
        {
          url: "/_next/static/chunks/pages/index-025e081126fe34ebe463.js",
          revision: "795785e87d79d95e002f8c57c84de195",
        },
        {
          url:
            "/_next/static/chunks/pages/social-login-4547b83028c167c619fb.js",
          revision: "1a52a07df571aa124d6ae9a4ce60f1ce",
        },
        {
          url:
            "/_next/static/chunks/pages/user/%5Busername%5D-485c4a850cb08abe63bd.js",
          revision: "16edb4108b580c693a0205f493d271bf",
        },
        {
          url:
            "/_next/static/chunks/pages/user/%5Busername%5D/settings-2a6a95b0745b1e952094.js",
          revision: "98150cf8024d89856eb636bce24cbcf0",
        },
        {
          url: "/_next/static/chunks/polyfills-d457c94a9b936d814978.js",
          revision: "0a6a21cf20384f84774d7c7a1734b491",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_abnf.7a16b725b080aeb4e5ef.js",
          revision: "4b93d661a28e80236c6597867aea9f06",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_accesslog.5e7ef2bf3071dee91dcb.js",
          revision: "a910428066712763d45f31ccc8431c31",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_actionscript.6d80b0d56f5ed7d3907d.js",
          revision: "a7e573308cd30fe8c75342b492b4208a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ada.0a83e11728885cb5c0fc.js",
          revision: "dabc7360778e5da74ca29b3f3bd6586b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_angelscript.95c7f086e37d83c75682.js",
          revision: "fd62d0ff8b0fb3a97f35638f7c9debc1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_apache.846f44d2951788d19064.js",
          revision: "d311e18b98900ed1826cd480d74dbf72",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_applescript.1f7a7fa9dd3877ddba52.js",
          revision: "bc750043f5f05d7c6b6dd07db9ef7035",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_arcade.f394dc9ecda806c215b5.js",
          revision: "457d776639cdd8dab4146f05e5d3a81d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_arduino.9f97a312a89a2bbfba51.js",
          revision: "8d3d9be6dc23ce17eaf60ef3876d10bc",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_armasm.09f8fca7d5a19e33be6e.js",
          revision: "011a4e9e4663e6920b67e7ae00e9bff3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_asciidoc.cd7e4c24823c0f726bca.js",
          revision: "3a54bee225364f79b09e5ed28866baaf",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_aspectj.4affe162f9540e6cb544.js",
          revision: "aa7e30fac261a63d5afa629606cd83d1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_autohotkey.7a457a8fc7eda07c4a63.js",
          revision: "acdbf13f03730ec6235c62d220b7ae8a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_autoit.234326dfc32355f93840.js",
          revision: "0536780125d8ceecc8be7b2bc716af09",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_avrasm.160fa362ead032ca9bde.js",
          revision: "a23107a5684bfb982f9abbdfce14c4e8",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_awk.0142b364115c40084f3b.js",
          revision: "87b8da9b87f87b340129f3c5163d96e3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_axapta.c30451da0a512efd8ca6.js",
          revision: "c38dd091be217d2073bea5fb4d66ecfd",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_bash.fc6ec3e3fb25af3162fb.js",
          revision: "a107c4952d255d38f4697c416f5f58d3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_basic.6ac0216c01e08e873820.js",
          revision: "0673226c181679e043a81fc7f2902797",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_bnf.5436d10be24e462e53a7.js",
          revision: "18b447c7950f1156802230266cfd5e93",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_brainfuck.15bba72d9e833a86c536.js",
          revision: "13f7c19b3b7323f5a25071cf3b5dbfa4",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_cal.baae76341e61a5e055f1.js",
          revision: "733de9741f32400155fd4e7016966392",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_capnproto.687d6a30d4ba4cd32a5b.js",
          revision: "1c7ad8de3d8a2be40823fb6e77cdbe97",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ceylon.48f45acc4c18dd932482.js",
          revision: "6d51506358b480f33bc03cd8e27962b3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_clean.242114def4cf775ba601.js",
          revision: "b14396cd2a133232accbb5c1590b91d7",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojure.369fd93080759dfb9424.js",
          revision: "d46a59562fc922f6c36dfe316b81e8bb",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojureRepl.dd6103ca393bb8073336.js",
          revision: "f6d1dc00d179f8f89bc81d840718df3f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_cmake.fef023aa9ec50ee797b5.js",
          revision: "f8085e94774ba165d5f54e78cc8eda59",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_coffeescript.03b9cdc7c594bfd7c14b.js",
          revision: "62eda76f6f4b54661ec542da092efb6b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_coq.7e1c0c00fd87b3d2113d.js",
          revision: "5fd561165218421d7c6f111c30e7f34f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_cos.4ff6cac39c223f8ca799.js",
          revision: "8c61c4b4af3152892e0da937b967cc20",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_cpp.fb5468e88b96841cc3a0.js",
          revision: "6d6dd8abf7fdee323cda2bb672b08bb1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_crmsh.50ef2d180bb42c691e6e.js",
          revision: "e68d790526ae93d8e7a7e935c58ff9dd",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_crystal.c13eccfde423e762fa28.js",
          revision: "78eb1a5e784b0e386400b57eb431d5ac",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_cs.1de00ac9f66f419fe907.js",
          revision: "9c8a58700595ad9d509054fef54669ee",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_csp.7d003df182d14557bdbe.js",
          revision: "3a38ef425afd13c216238692bea65ee9",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_css.0090f9063aa40f32c9ce.js",
          revision: "a56877c16fbef57cc0952cc3b468b9a8",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_d.0bf92535ebff024cad1d.js",
          revision: "5912f5dd38021f8f67d022e5c15ea7bb",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dart.7c99982fcd108bc20d28.js",
          revision: "7954ca4e9f4951897cb7fe52c4e2b094",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_delphi.fdd14fbb00e5b79fd7db.js",
          revision: "684122ee91913830e7ec9ad6529bb7ad",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_diff.da05118098a3252cb4a4.js",
          revision: "234be76236424191c98fb2723c08cd4a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_django.2e6d4356d569653c1b33.js",
          revision: "c5e79a36ac8000883557d67cc1cf7aba",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dns.72d12ce79bf128b27404.js",
          revision: "4ca740a9677127acab66bfffbaa5470d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dockerfile.f3d6b913f02a9801b20f.js",
          revision: "987cb4f78a68e87c00350fad2d5a0a8b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dos.c707dcd0668e461ced5e.js",
          revision: "d35c112e435947480d1fc747db959809",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dsconfig.20b258e9ee2768c57be4.js",
          revision: "ab00c00a1a3f7d5c1414f1db8a72c291",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dts.d2f686a7d48f5d63cd3c.js",
          revision: "f248e8ebf16e0fce044546d20b186e6b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_dust.1f7532544f0779a7b5dd.js",
          revision: "a307ddd2d624bd4c62896f5c2c1e98f5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ebnf.1db51e9ec931694e25c3.js",
          revision: "c48c732b557d864d86f1d47aac1373f6",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_elixir.24cfa1d45c2956049f94.js",
          revision: "b588a35e0ffb15f87e0a27606214cf45",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_elm.5101ff86d07aa7d15a3d.js",
          revision: "04a32da1a4cddf2046bca1877892038b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_erb.6cb9d18571366b3ed5b4.js",
          revision: "86b2a2bcf7be076d12e079aaddc2c9af",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlang.62157213ff25e4db9323.js",
          revision: "d83f3daeb55626397411717a53e468bc",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlangRepl.b861f2b40dcbdb9d3fe0.js",
          revision: "9c62af4d46e9a1842906cf26e717e645",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_excel.28e9aa1a22fceee3e400.js",
          revision: "0b2792b27146831bda44b80450066814",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_fix.218bf6d930cd1ff0c71c.js",
          revision: "3771fcadd78e79f6ff24a2d152f20187",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_flix.d972cef7b5f350b5a4fd.js",
          revision: "bc6007aa40e54557a75259e15fe9676b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_fortran.f9f8db53a996ebc10dd7.js",
          revision: "a31c3b81da0e03e2ddf2ce4455c750f1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_fsharp.bb6a2df4bd2b7a98c597.js",
          revision: "b01935faadaed30c4c582a0272bd93d5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gams.0d7391e48670554fa67b.js",
          revision: "f56c734b73e2df11934ba5d806feea93",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gauss.ca3233336b42604d82f7.js",
          revision: "09832d34d09da54aa19e20409c05ce34",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gcode.bab9cbfa13556acdc037.js",
          revision: "2bd3250a29d579c9957697027f453afd",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gherkin.88c9452db8e7071963f4.js",
          revision: "21da9419534f6e992ca070d45838bbdc",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_glsl.d17abd49f110d7f134ef.js",
          revision: "9ed1b085882e08e08e3d396a71970243",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gml.cedf260012fc03e73c45.js",
          revision: "975b915ba74b651f349ab351d61e4ee2",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_go.23755bc0cce8778e0b27.js",
          revision: "f3a0521e9d8674230113a4ad48405911",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_golo.3caa95431474e68858a3.js",
          revision: "289fa7a98315cda2b45637b1530baa1a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_gradle.fde34ef8d9009681b0dd.js",
          revision: "1a5e4781878e2e84940d6422556f57b9",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_groovy.ecfee85ec8ab522d6022.js",
          revision: "8e27cd43a8bbd8ab11836cf3033f1b16",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_haml.afd8a22a10736c6734e6.js",
          revision: "5ba0ee00dc5505135eb9cc14b56b56ca",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_handlebars.d3db01a87c72fa1d269f.js",
          revision: "50ec0c56d6c076dfe25c1de4e010c007",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_haskell.839a0cbcf1f2760b175f.js",
          revision: "4c1ff79940efe9b1615fd4ee39ea4168",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_haxe.98fd564f70f697dcf92a.js",
          revision: "ab55206f7786984c3716c349c788df35",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_hsp.7e4c45161ba460a873f3.js",
          revision: "d48ad24cb6f2bf29e485ddef757abf60",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_htmlbars.fb75e5b85632158b191e.js",
          revision: "b70b340e47506aafed93961f2723bf04",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_http.8eee19f52e5fdbd4f780.js",
          revision: "f6fad3f3bf5163ab9e1ba19fa3e871e8",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_hy.7c013a90cbb0d1b5b8aa.js",
          revision: "fb0237b97e0e8b99900890c406f121b9",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_inform7.90108f1e2848df9eb701.js",
          revision: "c78d3af543c150626331f48bf9189586",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ini.9e67d69fd2b24aa6fd74.js",
          revision: "9ecfa7f71d03a4ec8e7259aa92697beb",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_irpf90.62ecf8294f6fffbb6ddb.js",
          revision: "7d8268c18b3d29bd605f9f38f2516284",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_isbl.a1bf7d02142f129a21b0.js",
          revision: "2a171a4702233fa70c935f68a4e71e9a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_java.b18a15f2ba2c5747016a.js",
          revision: "bfaa0ff2dadafa2c14458ac67f303ed8",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_javascript.979885b79bd9ce07267d.js",
          revision: "69068fb06f13a19ea90d11a79ce07125",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_jbossCli.7d87548dea1f4afc470b.js",
          revision: "1a92d38a1e7089e8ad4639587996496a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_json.e4667c5d9d1666baf556.js",
          revision: "23c01227579ba93b289880897fc6a543",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_julia.ba70cef24f53df4b4c18.js",
          revision: "ede9cf4761d944eb0cd50d4e801343d5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_juliaRepl.7f90d70c5c935af1cb8d.js",
          revision: "e35739ea8da5c18d1141a7d6e3d41498",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_kotlin.b4110d462c1504bb7dbd.js",
          revision: "791c815853c839174aa109f8ecbb7e94",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_lasso.923b804f632875bedeb8.js",
          revision: "38ed86fe2f7e5279e4a0fd2c82521ac4",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ldif.a3239249431360c650aa.js",
          revision: "569ef9c11f275961263ca06605e2ef77",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_leaf.2dbe44ac8d1d386b714e.js",
          revision: "7061a144d042e732fb456d4cd5009db2",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_less.eeaaf8d5471cefcf3328.js",
          revision: "2ca083a5b2a4c0b79e722a91f98f4f0b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_lisp.3fb5009820d34e29d6f9.js",
          revision: "3c5dbdc997876d03a224f2cc2272f0f0",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_livecodeserver.b3e34d5de78b38a52c1b.js",
          revision: "b3d34a0139c04943cfe778b86d8aa0e5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_livescript.2c64a46f3a46cc42e940.js",
          revision: "a74d84dcaebf65d425d85f39aad60cee",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_llvm.c024631d1f9892f83bda.js",
          revision: "152c342a1a22c380d62c422b5796f954",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_lsl.416f166026629160fefb.js",
          revision: "ef8673a543c0cc5081426ec843d0bf2f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_lua.5d33a6c50f3d7e9ab077.js",
          revision: "c9c8c85273570e8e3678b3c2afe4a99f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_makefile.45b65be54e5c9c29b9e5.js",
          revision: "c9cf67dbd65b3b4ea7699fc8537953e1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_markdown.2409915d755190c12b87.js",
          revision: "1acf33e17b324c3299ae620c0f9082ad",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mathematica.4688f074ddf0e5c2e996.js",
          revision: "c3ef9503d2cd733a5a7edbf651c01c83",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_matlab.747baf03b90d915d6cd6.js",
          revision: "973b9b0cd3c1649634d297099d85f1aa",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_maxima.f7c9fe2c60e105c750fe.js",
          revision: "0edbe155ddf782a9f95a6b3bd2e7eb80",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mel.cc3b8df9025cd2b0f827.js",
          revision: "abb49d539e3f5ac4acea81374a0d1c0e",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mercury.112f5dfb39229cf88ee1.js",
          revision: "3ca22244b35b638a710e3a284da43243",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mipsasm.bd4245ce394a70f014c3.js",
          revision: "f5969e671ed0e42f725a524f3a59da51",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mizar.5ac0fe46279575d31435.js",
          revision: "30befc1e7e79655ee2c50bdd1f394cda",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_mojolicious.cd064f3ab355e098334f.js",
          revision: "d944a66cac4ca0964781966979b3e8a0",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_monkey.1104ca6e88709535ee76.js",
          revision: "2b75c3f69e450cf84f17a3618dabba10",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_moonscript.a8d5e8311e46b5ad0288.js",
          revision: "7fbf47f6fbcce3c755e32e18d3d23eec",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_n1ql.4b703681fac5abd4f0b0.js",
          revision: "24fc880a6a9c4cf72333a43ad62f0c46",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_nginx.cd63e569e916b25d5df2.js",
          revision: "1a0fdd845364b856c7a899eaef74dd2a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_nimrod.a1a9cd60270231284f53.js",
          revision: "e2b42c0f229d93b55b09dab72cb36682",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_nix.a59754a02b7c123fd68f.js",
          revision: "d9b159805dfc68ff6c3910c2e23e6489",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_nsis.33769595f4f20d8e58c2.js",
          revision: "9adc837d6f81d9a825287e394564b1f3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_objectivec.97cf4896a322160ee71f.js",
          revision: "c73d1fe85e65b2bee5d6051110f81c33",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ocaml.887d5f36c1ab22f59a8c.js",
          revision: "e7f9d2e35b8f82e44af0527cb5e4b720",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_oneC.2d9efac9ba299986e41f.js",
          revision: "24b2e690185bd2eb67ee87a81c8e453e",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_openscad.d334d6a476a2eafbba48.js",
          revision: "87f0a9647a84d02ebfeef09c5c2fc60d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_oxygene.a2d0256fda36db4d97a3.js",
          revision: "7b2c10bff19a0586b221cb553bd41f37",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_parser3.ae25a5c6310f2cd1c02d.js",
          revision: "c3deb7033833e574f3b1b57d2803b090",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_perl.4abbf028e364565e6b3b.js",
          revision: "3dff11f91067f3d33cb052c67573ff87",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_pf.eb8bea48004a1d5213f5.js",
          revision: "822ddd3559ceec0fc4655ae1adc66c36",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_pgsql.e063af61006ad75d42c6.js",
          revision: "ed0cbb685fd77c737fd7bc808ca003c9",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_php.030329d7e8fa8f45460a.js",
          revision: "205c75ab979028e3f868e3ba7149abe1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_plaintext.87735a5ea89b74e90623.js",
          revision: "6366f7b3af6694892d48485979ed73a7",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_pony.03c529c1282804943998.js",
          revision: "5467c061c9d12c0173fdbddbe4cbea2c",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_powershell.a5345b0bec4014c080ef.js",
          revision: "4b92f2c59d20aec315376e7eabb11cf5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_processing.0ef2c5d12613a19d0c1f.js",
          revision: "2647e07b5ddef32280407f6faa8cd059",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_profile.d1d008243672a30e8afa.js",
          revision: "730ac8ff8eabf29d573591602c4fe032",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_prolog.b43b0db672a55ff23884.js",
          revision: "779c719d01de4fd5fe6f1bf3f51f6790",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_properties.3a847cdfa5f15385290b.js",
          revision: "b3518e825e426aeffd0cd02f77f2b94b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_protobuf.383e4292f513bb6d8c80.js",
          revision: "1e0d10b2b1f44db450c82d58bbbdb657",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_puppet.e1801e039be0efe2d1f6.js",
          revision: "0c874be777060e75c7698443b886bcd3",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_purebasic.af174b11b4b486bc60aa.js",
          revision: "08877cb614d950f5a45417395fe536d5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_python.e00579cdf78826eb3390.js",
          revision: "599b1f95f327e317e25a82ad31c35745",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_q.0ac2e8b5ef60bcfac744.js",
          revision: "9ab42e717a6eeecbe5a8fa921db3bab1",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_qml.9e438d3ae5c12d4f124a.js",
          revision: "5d41d555be4f7541783d3668176e8a10",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_r.49f34a5430dc40bb5ac5.js",
          revision: "48105fc2343c72d9a3c4195e2ef58c2a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_reasonml.67a047c13c1ad484c761.js",
          revision: "1edd40727dd262070aa5151bed11cdd6",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_rib.22225a001f1755fae078.js",
          revision: "97a06902ac722413707ab79e37509dfd",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_roboconf.114cf0d972b3051b6257.js",
          revision: "28dbc0f062593552d259d85bf35cac63",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_routeros.836a4b540244e8aaf4d0.js",
          revision: "219e3ccf6413dd43c2f5442625565ace",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_rsl.04ac417e0d57e6fe03c4.js",
          revision: "ee98e56daf2bb639c551182cb61e1001",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruby.7a84d571c356e1111471.js",
          revision: "41ddba13d4639bacf1a329c7c3dc5cb4",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruleslanguage.7c301a7d3066c427bc14.js",
          revision: "e71a9792ed5355c3a9f19aae319f1c51",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_rust.3624451916ef2dc41a54.js",
          revision: "8167bcc8f203587bd1f76c073e2b88c6",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_sas.f1bcd248c1ff6f831def.js",
          revision: "9734f7ec07d4964dbe4d7d6a6e5d8679",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_scala.def4ca75a7227eed6b84.js",
          revision: "fea659612bfbd0731227398689e2ba25",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_scheme.a1abd7aeb6bd3775ab66.js",
          revision: "00ba99028bea6c0d5c4f7d03b8fa393d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_scilab.461aab8320b4af711a04.js",
          revision: "a6d54aa0d932061d3fb6f1c7b191a4d5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_scss.f9c98df89213a0760186.js",
          revision: "a7a72d2080f743d5c81d33487622fc8b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_shell.a2450dfffa4e21b452c3.js",
          revision: "18d74b4c702f0eacae26b701b3d03684",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_smali.eeac2d63305276d8a552.js",
          revision: "ac9046a747a5a8e77301d738848879bf",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_smalltalk.db6c6652932bcf0fd092.js",
          revision: "864e3eb05499ca255097698557306d6c",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_sml.74e4ddde876d2e9073bf.js",
          revision: "30586b47dcbc2c4ec344304b793b193a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqf.2da0ef343043a2c4db29.js",
          revision: "c26c678dec4cfcab2b8786e0b12b0aed",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_sql.104f81859fd4058ed1d2.js",
          revision: "e587c88a6ca9298bd848d802c99b9e81",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_stan.163183516232cf4d38b1.js",
          revision: "8d43b28af65b892b75ef3e3d076dd8bd",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_stata.c86405cb0c5584eaca1b.js",
          revision: "31699745d04878dd01f9d1641ca4ad9d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_step21.7375a91ce327a6511272.js",
          revision: "0be166efade7c60e1c95e3ee288ec352",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_stylus.7426fb264c679845f84f.js",
          revision: "80c8f714523add767a1f21c43dc25fcb",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_subunit.0bb3a291189f3cfe0f0a.js",
          revision: "699d884822a2bd4596acc7c0dfd34508",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_swift.013d3e40e9e8ec5bda87.js",
          revision: "514e24f66162e15e71b1fff13150209b",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_taggerscript.2209ce72c9cc3bb69a96.js",
          revision: "1bf7120e7d18cac1a0bf6870538cbd5f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_tap.ee976bcdb25d139d18a9.js",
          revision: "f4e096f179a8e77a132a6bc069a6151a",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_tcl.1b5ea69c830b1582ddf7.js",
          revision: "41ed1a29243e05c5009e5ce6f31ba528",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_tex.cd0dfc4638e49e43d00a.js",
          revision: "56211955b65ad415d196f2ff2db135e5",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_thrift.12825b6169450d4987d0.js",
          revision: "e5971cb3d2241f00c7a607614247ef93",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_tp.6441d59e7d96f437f56c.js",
          revision: "9fca2194aedb549aa851b8b3eaf366c0",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_twig.0123a7a07bee970d4e25.js",
          revision: "cbf9d3acb1563a1adb7a06c1d8dc8f9d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_typescript.02a6b9163fab2c1d7d36.js",
          revision: "bcfab3b60be350973649973a3af2e13f",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vala.c2b4272e2feefac5c4c7.js",
          revision: "9e7b8f95208dc731add88d942e80fb13",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbnet.b78942077d52caecbc1e.js",
          revision: "9fb2fbe799e77b191f42b5bfba710209",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscript.69529f76c89ff3795937.js",
          revision: "87be6ed2b68da425944ddcba7d48d7cc",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscriptHtml.c9dcafbff43e8c312f3a.js",
          revision: "0aea44d45440cffced5a5e712896a65e",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_verilog.2745db46cee45b6e520b.js",
          revision: "2ac660435b6c5dd288b820e61245d3cf",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vhdl.0e83ba59b070e778ee4a.js",
          revision: "2e6d5779c901ab0cc8604b329177efd9",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_vim.dbbd519fbfbdc6d08a68.js",
          revision: "bcad498d03c267cba6ddc89cdcce77b0",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_x86asm.a6b25d4fb850be253044.js",
          revision: "329119dfcce837655a2c91c197bd0c59",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_xl.44745b59fdd3955b37e0.js",
          revision: "f6f7cbf4974c4a40f24a4440095e3d9d",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_xml.97815741417097272149.js",
          revision: "44a996b370d9d9b1838b890272c90533",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_xquery.e85aefb163ee40227591.js",
          revision: "4c6f4d759b609a54a79500e6affbb64c",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_yaml.0ec25992de83f7dc1722.js",
          revision: "c788dd5606f980c4204d15202c5cfca2",
        },
        {
          url:
            "/_next/static/chunks/react-syntax-highlighter_languages_highlight_zephir.df0969fbad95623867a1.js",
          revision: "ed712913c7e5ee2bd5c1257808bbff83",
        },
        {
          url: "/_next/static/chunks/webpack-d010a7d79dc2f3582e27.js",
          revision: "5229f4f521c63003043a04441e12f81b",
        },
        {
          url: "/_next/static/css/89f5c1f16e5fab5eec5f.css",
          revision: "5764fe746803acd7c7a0fb311bde0de3",
        },
        {
          url: "/_next/static/css/fa155078f5d6793d6d34.css",
          revision: "88c738cc6409b6e9f299d1c065b0b4e9",
        },
        {
          url: "/_next/static/mXVKjHMgzaVYIOJEacygX/_buildManifest.js",
          revision: "e8882d6d67cdab1e78b130f60bdcfbcc",
        },
        {
          url: "/_next/static/mXVKjHMgzaVYIOJEacygX/_ssgManifest.js",
          revision: "abee47769bf307639ace4945f9cfd4ff",
        },
        {
          url:
            "/_next/static/media/remixicon.5cb99e6cba5a4619063f73d47b775f6f.eot",
          revision: "31d28485e1cf7369272270fd730327c0",
        },
        {
          url:
            "/_next/static/media/remixicon.8d09fa11700ed63cf96e1d1c038368f3.woff",
          revision: "881fbc46361e0c0e5f003c159b2f3005",
        },
        {
          url:
            "/_next/static/media/remixicon.90668f6f9b3c2c18a090f132d1793c67.woff2",
          revision: "9915fef980fa539085da55b84dfde760",
        },
        {
          url:
            "/_next/static/media/remixicon.9cedd2150922ead848695530d71a212f.svg",
          revision: "95138f36e015ad912c37db92164f5844",
        },
        {
          url:
            "/_next/static/media/remixicon.f2616f597cf98f38d2347c9648bfe049.ttf",
          revision: "888e61f04316f10bddfff7bee10c6dd0",
        },
        { url: "/art.svg", revision: "2b01dfa2b1fe23ba240da9ac72784bc8" },
        {
          url: "/article-not-found.svg",
          revision: "03ddafd403895580f95e45de0f4eb949",
        },
        { url: "/article.svg", revision: "4756a28f21f6f97df2d1258709113d82" },
        {
          url: "/avatar-placeholder.jpeg",
          revision: "9eddcb5b07221324a7587dac2ddd12eb",
        },
        { url: "/blob.svg", revision: "a00d120d2cc1997b81a1c214ad06a8e1" },
        { url: "/blur.css", revision: "51e01b35ca8cd6358e1f5118ee3116b3" },
        { url: "/bookend.json", revision: "11a17b9f7d5c8284ea597475c51f3532" },
        {
          url: "/comingSoon.svg",
          revision: "e9e189504e23fe60a0db550502c443cb",
        },
        {
          url: "/cover-placeholder.webp",
          revision: "29b47568561d47e898f1315664697218",
        },
        { url: "/cover.svg", revision: "6bb5bed73b4e7e292aa89bd79521eaaf" },
        { url: "/cover.webp", revision: "251c80c56a7a6cbcc03d2f89c866b986" },
        {
          url: "/create-done.svg",
          revision: "1537a1ea9e8ef32084afa03575c5327a",
        },
        {
          url: "/dark-less.less",
          revision: "7a5445c02b6400b5c7423d800077b001",
        },
        { url: "/dark.css", revision: "f130f75e1993d8e086eec0cb7e42e708" },
        { url: "/dark.scss", revision: "044e8b21f5e38be789b8e22603c39f3b" },
        {
          url: "/email-confirm.svg",
          revision: "05f2a023857be32680fb48458e7efd89",
        },
        { url: "/facebook.svg", revision: "431c05f2ff7649e8720fead8e4b5a3c2" },
        { url: "/favicon.ico", revision: "21b739d43fcb9bbb83d8541fe4fe88fa" },
        {
          url: "/forgot-password.svg",
          revision: "a6426e6682af14c8243142ee516ccdf4",
        },
        { url: "/google.svg", revision: "14137f89247c1ab0eb29e8b75ef6e9d6" },
        {
          url: "/gradients.json",
          revision: "1bf5d4eaf1b7bebb281d02515804c5a0",
        },
        { url: "/highlight.js", revision: "b0017de86b542ae94fa6fd5b3b7f5f73" },
        { url: "/icons.json", revision: "3e1b1ffbf2516f9e8db3dddfb5499602" },
        {
          url: "/icons/192x.png",
          revision: "28593ac0d6445ecb131943502a4260e2",
        },
        {
          url: "/icons/512x.png",
          revision: "ec19f291e1287db9def46ab38ecd0913",
        },
        {
          url: "/image-placeholder.png",
          revision: "20b1f1d4dcd1546b57f81639769079d8",
        },
        {
          url: "/image-placeholder.svg",
          revision: "abe91c3c0c0d784b97765ce3d0362122",
        },
        { url: "/instagram.svg", revision: "a2bcf89291d23dd2956c52b5d3a8f1b1" },
        { url: "/light.scss", revision: "5bf638c7ff36a60f7d26dbcb37947cbd" },
        { url: "/loader.gif", revision: "1069549bfee57dedfaaa51485a4abb79" },
        { url: "/manifest.json", revision: "ca6cfaf075e5ec5b7f18b6f2a355a014" },
        {
          url: "/monokai-sublime.css",
          revision: "0c8b4c0e8a584e7142b08d914644cd9d",
        },
        {
          url: "/no-comment.svg",
          revision: "9d601933088ddeb47a920870b06a8e71",
        },
        {
          url: "/server-error.svg",
          revision: "1245afd0d2e9f97d21b805417e7d9ece",
        },
        { url: "/style.scss", revision: "bede88cce698f89c6b9a3b55f0651ba5" },
        { url: "/twitter.svg", revision: "86f0bb297f2e548f2ab8c748710decd4" },
        { url: "/zeit.svg", revision: "0a0e3c5453443ca00f2798add778f58d" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
