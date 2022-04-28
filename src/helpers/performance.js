export function calculate_load_times(skipAvatars) {
  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported");
    return;
  }

  const resources = performance.getEntriesByType("resource");
  if (resources === undefined || resources.length <= 0) {
    console.log(
      "= Calculate Load Times: there are NO `resource` performance records"
    );
    return;
  }

  console.log("= Calculate Load Times");
  for (let i = 0; i < resources.length; i++) {
    if (skipAvatars && resources[i].name.includes("avatars")) {
      continue;
    }
    console.group(`===> ${resources[i].name}`);
    let t = resources[i].redirectEnd - resources[i].redirectStart;
    console.log("... Redirect time = " + t);

    t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
    console.log("... DNS lookup time = " + t);

    t = resources[i].connectEnd - resources[i].connectStart;
    console.log("... TCP time = " + t);

    t =
      resources[i].secureConnectionStart > 0
        ? resources[i].connectEnd - resources[i].secureConnectionStart
        : "0";
    console.log("... Secure connection time = " + t);

    // Response time
    t = resources[i].responseEnd - resources[i].responseStart;
    console.log("... Response time = " + t);

    t =
      resources[i].fetchStart > 0
        ? resources[i].responseEnd - resources[i].fetchStart
        : "0";
    console.log("... Fetch until response end time = " + t);

    t =
      resources[i].requestStart > 0
        ? resources[i].responseEnd - resources[i].requestStart
        : "0";
    console.log("... Request start until response end time = " + t);

    t =
      resources[i].startTime > 0
        ? resources[i].responseEnd - resources[i].startTime
        : "0";
    console.log("... Start until response end time = " + t);
    console.groupEnd();
  }
}
