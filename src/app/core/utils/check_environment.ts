export function getEnvironmentName() {
    const hostname = window.location.hostname;
  
    if (hostname.includes('localhost') || hostname.includes('staging')) {
      console.log("The environment is test")
      return 'test';
    }else {
      console.log("The environment is test")
      return 'prod';
    }
  }
  
  