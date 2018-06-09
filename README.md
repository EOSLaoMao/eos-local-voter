# EOS Local Voter

### A local voter written using nodejs and eosjs

When secret keys goes online, they are not secret anymore, right? You should never expose you secret key to anyone(just like BPs should never expose their producer IPs to anyone).

As EOS holders, how about you run a voting portal locally? on your secret computer maybe? Let's introduce you the EOS Local Voter, which provide a voting portal locally, just for your self.

Here is how it works:

1. You configure your account name and a remote API endpoint on EOS mainnet.

2. EOS Local Portal helps you connect to this endpoint using official eosjs library, which will fetch all the data back and display it in your browser for you.

3. In your browser, input the producers you want to vote, and input your key, and vote! Eosjs lib does all these signature staff for you.

4. After voting, feel free to stop the local server and delete the code.


### 0. Install Nodejs

https://nodejs.org/en/


### 1. Clone this project and run

```
git clone https://github.com/EOSLaoMao/eos-local-voter.git

cd eos-local-voter

npm install

npm start
```

When the local server up and running, open your browser and visit: http://127.0.0.1:3000/

Enjoy!
