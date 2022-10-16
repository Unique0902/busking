class IpService {
  async getIp() {
    const ipData = await fetch('https://geolocation-db.com/json/');
    const locationIp = await ipData.json();
    return locationIp;
  }
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }
  auth = getAuth();
  user = this.auth.currentUser;

  logout() {
    signOut(this.auth);
  }
}

export default IpService;
