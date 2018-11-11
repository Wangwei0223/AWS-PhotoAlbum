var https = require('https');
var jose = require('node-jose');
var region = 'us-west-2';
var userpool_id = 'us-west-2_d1PKrQeyR';
var app_client_id = '7i2i8gn6el0pb1vuqr4d3tduod';
var keys_url = 'https://cognito-idp.' + region + '.amazonaws.com/' + userpool_id + '/.well-known/jwks.json';

console.log(keys_url);

var token1 = 'eyJraWQiOiJYcFd0QitjaFwvNmNQb21iR0srSXdcL3lHdm92M3RIUjFaaXF3MmlLZk56djA9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiWldPbk1fTjdpNDZMNGlTZG5Pbk5QQSIsInN1YiI6IjU4Njg1ZDU1LTdkM2QtNGU3Yi1hMTQwLTk1NjlhNGMwZjlmZiIsImF1ZCI6IjdpMmk4Z242ZWwwcGIxdnVxcjRkM3RkdW9kIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQxMjgzMjE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9kMVBLclFleVIiLCJjb2duaXRvOnVzZXJuYW1lIjoiNTg2ODVkNTUtN2QzZC00ZTdiLWExNDAtOTU2OWE0YzBmOWZmIiwiZXhwIjoxNTQxMjg2ODE5LCJpYXQiOjE1NDEyODMyMTksImVtYWlsIjoid3cxMzA2QG55dS5lZHUifQ.BsnJF9hW1dxeudhai4LiHWSzmCQ8lCsbeJ0NQsDHiHs3NlVe0GGcPuBDxGFjJBEVRUSCAA8GAGsH5wssKUYgPkYi0HbLMDcXsvOvkcYlAqu9iwhi-G7raDMEC6D1c87LNfNYwyu4M7Lgz5WXhieYYR1H3ZVDwoG22evqAIRutAZwyt8zSb_Q_WD90gytGMQ_rhUppTM3ns9UQX7wXoIJDh9SkXFYUjw7oPiBL4IxsiCGCwdg6Lv65V4ZMfuLWt_gqvibT1s1LkoDnp8USE704Uf2GCmnnL5Y6ruwVf89VaryllkgeU9BSwtWcQorEw7dAnEnnSjr9IS62xCcZHKe9Q&access_token=eyJraWQiOiJRRjc5QkxUWnFSSEQ0bTdQRmZDNVduVlM3MGg4K1wvWG1ocVRYd1lUTnZiZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY4NWQ1NS03ZDNkLTRlN2ItYTE0MC05NTY5YTRjMGY5ZmYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTQxMjgzMjE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9kMVBLclFleVIiLCJleHAiOjE1NDEyODY4MTksImlhdCI6MTU0MTI4MzIxOSwidmVyc2lvbiI6MiwianRpIjoiNmFhNTY3NDgtYTMyNy00YWMzLWExM2MtNTFhYWUzMDAyYTEzIiwiY2xpZW50X2lkIjoiN2kyaThnbjZlbDBwYjF2dXFyNGQzdGR1b2QiLCJ1c2VybmFtZSI6IjU4Njg1ZDU1LTdkM2QtNGU3Yi1hMTQwLTk1NjlhNGMwZjlmZiJ9.Ha-qrOBZvOLh8wdFXYWPlnCJJl_WuORhYz2r2ZvpQTu5D6x5d0XOZS2lxR7SE8WVbb1NeDpljziZSE1-B9IDL88sQ5zDX9OZRpIX9yPMCulIfqM7hScnLBj6FTTDdxPPoV731GGNyEsymshk-7VoZUzgvR1G_rFtKKpczgmoB1xkFW2dVkDCx8tuBv6bEtb7jis2npSZKLW3Vy4tpBi22jylqGMIGY-nD-dvd5vpeCFx_xMGORwfdF4fH0bujENFqzklSWAz04AwiWyAURHKr9SsCjafYGtVedvhTafbIlOG5GsG8-TiJK9PCTM9_3T_zAb8mNChcz2KjvtV8NyNmg';
console.log(token1.length);
var token2 = 'eyJraWQiOiI4ZEE5eTZXTW9ONGRYK2tkRGcrckVBdVJXcEM2cEJLZ1VpZGtTbHZvWXRvPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoicS0tNVdaRVROREJwZG5LUXpGSl9oUSIsInN1YiI6IjljM2E0YTgwLTI5YWEtNGRlYy1iOTgyLTA4N2RlOGQxMjI1OSIsImF1ZCI6IjZnOWl0aThjcnFzZjQ2aHY5cHYyMHA2NTdtIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiZjEyYWYxMTQtZGZjMy0xMWU4LWE2MmEtM2Q5NTZhZjZhYTA5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1NDEyODkzMjksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzgwMUZsVHpMUSIsImNvZ25pdG86dXNlcm5hbWUiOiI5YzNhNGE4MC0yOWFhLTRkZWMtYjk4Mi0wODdkZThkMTIyNTkiLCJleHAiOjE1NDEyOTI5MjksImlhdCI6MTU0MTI4OTMyOSwiZW1haWwiOiJqbDkwNzVAbnl1LmVkdSJ9.W9Vac_gw2Veb_kxj3MLR36qItGDGw31GbKxmBkzGf-R68sM0ZP40ocMr8SCm-26i2f3E2cXTtJwbU_99dDGuczm0vtBucdmfbJJIDRmgcSZy98Upa9E-ld9wZUcSc2M6gsaAwEqnTLH3BzLjuXveBFfgqSrnAELzkHBB6Xiwg9Y5r4bIXbmwyPJDUBPnhzi0WwCLCPdMpaz2h-vqdkXyEu-5YUY0SbpodQJzr7tQoCpj79ntUnolpeKgUDfu8LAizbZnzahWYXY9yV6hG6utEWiNxAwsFB2hYI_0XeOnItUN3fVMgvSDFlgxKtSvIW9IX8i9u8EBzI3b71YZ1Mfcdg&access_token=eyJraWQiOiJadkxYcERqa2F6THFHanFpelNUb3NXYVVDYThjUndWSFR6MFJPR2RQaWQ4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzNhNGE4MC0yOWFhLTRkZWMtYjk4Mi0wODdkZThkMTIyNTkiLCJldmVudF9pZCI6ImYxMmFmMTE0LWRmYzMtMTFlOC1hNjJhLTNkOTU2YWY2YWEwOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1NDEyODkzMjksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzgwMUZsVHpMUSIsImV4cCI6MTU0MTI5MjkyOSwiaWF0IjoxNTQxMjg5MzI5LCJ2ZXJzaW9uIjoyLCJqdGkiOiI1NjhhNTM0ZS0xNTUzLTRkZWYtYjI4NS03ZTk1YmQyODMwMmYiLCJjbGllbnRfaWQiOiI2ZzlpdGk4Y3Jxc2Y0Nmh2OXB2MjBwNjU3bSIsInVzZXJuYW1lIjoiOWMzYTRhODAtMjlhYS00ZGVjLWI5ODItMDg3ZGU4ZDEyMjU5In0.j_npaQR1Xp3vwiB4u6z0aSVDiW-uIX3ZXfoPT2QkZqzeh32Y7ygWk2Bm2KYoXF-__ZKq37l5pS0Yc8vR26C-zblgTN99LIPeNP5vtzBwjhknV3hT6dl8j7eQe-K5vd7fMdZVRDw0HL1VGFTrqNi-O6U87b6V6DyXAOU7u7lZyHrtrstmJmUWbW_YL-QppZ4Bv6JRiK2zKS6jzw7OPBKFMQNDnrRuZOHBXiROhlmHL4sWBfDuRRb6_ks2LXvcRhL7PuhnXox0p9SnpVOSYY-cs7YhrBIAQVPxM09TGwtFqeF3JL0xMmNtzUGy0WWvt774peieyu2';
var token = token2;
var sections = token.split('.');
// get the kid from the headers prior to verification
var header = jose.util.base64url.decode(sections[0]);
var payload = jose.util.base64url.decode(sections[1]);

header = JSON.parse(header);
var kid = header.kid;

console.log(JSON.parse(payload));
// download the public keys
// https.get(keys_url, function (response) {
//     if (response.statusCode == 200) {
//         response.on('data', function (body) {
//             var keys = JSON.parse(body)['keys'];
//             // search for the kid in the downloaded public keys
//             console.log(JSON.parse(body));
//             var key_index = -1;
//             for (var i = 0; i < keys.length; i++) {
//                 if (kid == keys[i].kid) {
//                     key_index = i;
//                     break;
//                 }
//             }
//             console.log('key_index: ' + key_index);
//             if (key_index == -1) {
//                 console.log('Public key not found in jwks.json');
//                 console.log('Public key not found in jwks.json');
//             }
//             // construct the public key
//             jose.JWK.asKey(keys[key_index]).
//                 then(function (result) {
//                     // verify the signature
//                     console.log('result: ' + JSON.stringify(result));
//                     jose.JWS.createVerify(result).
//                         verify(token).
//                         then(function (result) {
//                             // now we can use the claims
//                             var claims = JSON.parse(result.payload);
//                             console.log('claims: ' + claims);
//                             // additionally we can verify the token expiration
//                             current_ts = Math.floor(new Date() / 1000);
//                             if (current_ts > claims.exp) {
//                                 console.log('Token is expired');
//                             }
//                             // and the Audience (use claims.client_id if verifying an access token)
//                             if (claims.aud != app_client_id) {
//                                 console.log('Token was not issued for this audience');
//                             }
//                             console.log(null, claims);
//                         }).
//                         catch(function () {
//                             console.log('Signature verification failed');
//                         });
//                 });
//         });
//     }
// });
