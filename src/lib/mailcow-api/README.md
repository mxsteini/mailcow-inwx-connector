# Mailcow Api
<img draggable="none" src="https://git.y.gy/firstdorsal/mailcow-api/-/raw/master/logo.jpg" style="float:left; margin-right:10px;" height="100"> 

## A wrapper for the **mailcow web API** with the most relevant functions.

[![npm](https://ico.y.gy/npm/dm/mailcow-api?style=flat-square&logo=npm)](https://www.npmjs.com/package/mailcow-api)
[![NPM](https://ico.y.gy/npm/l/mailcow-api?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/mailcow-api)
[![Snyk Vulnerabilities for npm package](https://ico.y.gy/snyk/vulnerabilities/npm/mailcow-api?style=flat-square&logo=snyk)](https://snyk.io/test/npm/mailcow-api)
[![Website](https://ico.y.gy/website?down_color=red&down_message=offline&label=documentation&up_color=success&up_message=online&url=https%3A%2F%2Fdoc.y.gy%2Fmailcow-api&style=flat-square)](https://doc.y.gy/mailcow-api/)
[![Website](https://ico.y.gy/website?down_color=red&down_message=offline&label=repository&up_color=success&up_message=online&url=https%3A%2F%2Fgit.y.gy%2Ffirstdorsal%2Fmailcow-api&style=flat-square&logo=gitlab)](https://git.y.gy/firstdorsal/mailcow-api/)


# Install
```
npm i mailcow-api
```

# Basic Example
```js
(async () => {
    //get global variables
    require('dotenv').config();
    
    //import the api client module
    const {
        MailcowApiClient
    } = require("mailcow-api")

    //create new mailcow api client with endpoint/baseurl and the api key
    const mcc = new MailcowApiClient(process.env.MAILCOW_API_BASEURL, process.env.MAILCOW_API_KEY);

    //get all domain on mailcow server
    console.log(await mcc.getDomain());
})();
```

## What is dotenv?
The line "require('dotenv').config();" gets the contents of a file called ".env" in which you should store your global and secret variables.

### 1. Install the module "dotenv" with
```
npm i dotenv
```
### 2. Create a file named ".env" in your applications root directory

*.env*
```c
MAILCOW_API_KEY='YOUR MAILCOW API KEY'
MAILCOW_API_BASEURL='https://mail.example.com' //no trailing slashes
```
### 3. Use your secret variables 
```
process.env.MAILCOW_API_BASEURL
process.env.MAILCOW_API_KEY
```

# Where to get the API key?
### 1. Open your mailcow UI and login as admin


### 1.1 Are you using two factor authentication for your admin account?
If not: **Do it now!** It's easy! For Android you can use the andOTP app.
andOTP can be used for 2FA with many services and is way better then the Google Authenticator app.

### 2. Scroll to and expand the API section

### 3. Insert the IP you want to accesss the API from or disable the API check

### 4. Tick the checkbox "Activate API" and save the settings

### 5. Copy your API key from the field above


# Documentation
**[Here](https://doc.y.gy/mailcow-api/)**

# Need help or missing a feature?
Feel free to contact me via [xl9jthv_7bvgakv9o9wg0jabn2ylm91xxrzzgt0e@y.gy](mailto:xl9jthv_7bvgakv9o9wg0jabn2ylm91xxrzzgt0e@y.gy) in english or german

## Mailcow API Documentation
[Apiary](https://mailcow.docs.apiary.io/)

[Swagger](https://demo.mailcow.email/api/)

## Links
[NPM](https://www.npmjs.com/package/mailcow-api)

[Documentation](https://doc.y.gy/mailcow-api/)

[Code](https://git.y.gy/firstdorsal/mailcow-api)



## Modules

<dl>
<dt><a href="#module_mailcow-api">mailcow-api</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Domain">Domain</a> : <code>Object</code></dt>
<dd><p>For all options check out <a href="https://demo.mailcow.email/api/">https://demo.mailcow.email/api/</a></p>
</dd>
<dt><a href="#DKIM">DKIM</a> : <code>Object</code></dt>
<dd><p>Object representing a DKIM Key</p>
</dd>
<dt><a href="#DomainAdmin">DomainAdmin</a> : <code>Object</code></dt>
<dd><p>Object representing a domain admin</p>
</dd>
<dt><a href="#Mailbox">Mailbox</a> : <code>Object</code></dt>
<dd><p>Object representing a mailbox</p>
</dd>
</dl>

<a name="module_mailcow-api"></a>

## mailcow-api

* [mailcow-api](#module_mailcow-api)
    * [.MailcowApiClient](#module_mailcow-api.MailcowApiClient)
        * [new module.exports.MailcowApiClient(baseurl, apikey)](#new_module_mailcow-api.MailcowApiClient_new)
        * [.getDomain([domain])](#module_mailcow-api.MailcowApiClient+getDomain) ⇒ <code>Array</code>
        * [.addDomain(domain)](#module_mailcow-api.MailcowApiClient+addDomain) ⇒ <code>Boolean</code>
        * [.editDomain(domains, attributes)](#module_mailcow-api.MailcowApiClient+editDomain) ⇒ <code>Boolean</code>
        * [.deleteDomain(domain)](#module_mailcow-api.MailcowApiClient+deleteDomain) ⇒ <code>Boolean</code>
        * [.addDKIM(dkim)](#module_mailcow-api.MailcowApiClient+addDKIM) ⇒ <code>Boolean</code>
        * [.getDKIM(domain)](#module_mailcow-api.MailcowApiClient+getDKIM) ⇒ <code>Object</code>
        * [.deleteDKIM(domain)](#module_mailcow-api.MailcowApiClient+deleteDKIM) ⇒ <code>Boolean</code>
        * [.addAndGetDKIM(dkim)](#module_mailcow-api.MailcowApiClient+addAndGetDKIM) ⇒ <code>Object</code>
        * [.addDomainAdmin(domainAdmin)](#module_mailcow-api.MailcowApiClient+addDomainAdmin) ⇒ <code>Object</code>
        * [.addMailbox(mailbox)](#module_mailcow-api.MailcowApiClient+addMailbox) ⇒ <code>Object</code>
        * [.deleteMailbox(mailboxes)](#module_mailcow-api.MailcowApiClient+deleteMailbox) ⇒ <code>Boolean</code>
        * [.addAlias(address, goto)](#module_mailcow-api.MailcowApiClient+addAlias) ⇒ <code>Boolean</code>

<a name="module_mailcow-api.MailcowApiClient"></a>

### mailcow-api.MailcowApiClient
Class representing the Mailcow API client

**Kind**: static class of [<code>mailcow-api</code>](#module_mailcow-api)  

* [.MailcowApiClient](#module_mailcow-api.MailcowApiClient)
    * [new module.exports.MailcowApiClient(baseurl, apikey)](#new_module_mailcow-api.MailcowApiClient_new)
    * [.getDomain([domain])](#module_mailcow-api.MailcowApiClient+getDomain) ⇒ <code>Array</code>
    * [.addDomain(domain)](#module_mailcow-api.MailcowApiClient+addDomain) ⇒ <code>Boolean</code>
    * [.editDomain(domains, attributes)](#module_mailcow-api.MailcowApiClient+editDomain) ⇒ <code>Boolean</code>
    * [.deleteDomain(domain)](#module_mailcow-api.MailcowApiClient+deleteDomain) ⇒ <code>Boolean</code>
    * [.addDKIM(dkim)](#module_mailcow-api.MailcowApiClient+addDKIM) ⇒ <code>Boolean</code>
    * [.getDKIM(domain)](#module_mailcow-api.MailcowApiClient+getDKIM) ⇒ <code>Object</code>
    * [.deleteDKIM(domain)](#module_mailcow-api.MailcowApiClient+deleteDKIM) ⇒ <code>Boolean</code>
    * [.addAndGetDKIM(dkim)](#module_mailcow-api.MailcowApiClient+addAndGetDKIM) ⇒ <code>Object</code>
    * [.addDomainAdmin(domainAdmin)](#module_mailcow-api.MailcowApiClient+addDomainAdmin) ⇒ <code>Object</code>
    * [.addMailbox(mailbox)](#module_mailcow-api.MailcowApiClient+addMailbox) ⇒ <code>Object</code>
    * [.deleteMailbox(mailboxes)](#module_mailcow-api.MailcowApiClient+deleteMailbox) ⇒ <code>Boolean</code>
    * [.addAlias(address, goto)](#module_mailcow-api.MailcowApiClient+addAlias) ⇒ <code>Boolean</code>

<a name="new_module_mailcow-api.MailcowApiClient_new"></a>

#### new module.exports.MailcowApiClient(baseurl, apikey)
Create a Mailcow API client.


| Param | Type | Description |
| --- | --- | --- |
| baseurl | <code>string</code> | The base url where the api can be found |
| apikey | <code>string</code> | The api key for the mailcow api endpoint |

**Example**  
```js
(async () => {
    //get global variables
    require('dotenv').config();
    
    //import the api client module
    const {
        MailcowApiClient
    } = require("mailcow-api")

    //create new mailcow api client with endpoint/baseurl and the api key
    const mcc = new MailcowApiClient(process.env.MAILCOW_API_BASEURL, process.env.MAILCOW_API_KEY);

    //get all domain on mailcow server
    console.log(await mcc.getDomain());
})();
```
<a name="module_mailcow-api.MailcowApiClient+getDomain"></a>

#### mailcowApiClient.getDomain([domain]) ⇒ <code>Array</code>
Gets a specific domain or all domains

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Array</code> - Array of domains  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [domain] | <code>String</code> | <code>&#x27;all&#x27;</code> | The domain you want to get |

**Example**  
```js
await mcc.getDomain()
```
<a name="module_mailcow-api.MailcowApiClient+addDomain"></a>

#### mailcowApiClient.addDomain(domain) ⇒ <code>Boolean</code>
Adds a domain to the server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| domain | <code>String</code> \| [<code>Domain</code>](#Domain) | The domain you want to add |

**Example**  
```js
await mcc.addDomain({
            domain: "example.com",
        }))
```
<a name="module_mailcow-api.MailcowApiClient+editDomain"></a>

#### mailcowApiClient.editDomain(domains, attributes) ⇒ <code>Boolean</code>
Edits one or more domains on the server. Applies the attributes to all domains provided.

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| domains | <code>Array</code> \| <code>String</code> | The domains you want to edit |
| attributes | <code>Object</code> | Attributes to change for all domains provided domains |

**Example**  
```js
await mcc.editDomain(["example.com"], {
            aliases: 399
        });
        //This will set the aliases of example.com to 399
```
<a name="module_mailcow-api.MailcowApiClient+deleteDomain"></a>

#### mailcowApiClient.deleteDomain(domain) ⇒ <code>Boolean</code>
Removes a domain from the server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| domain | <code>String</code> \| <code>Array</code> | The domain/domains you want to delete |

**Example**  
```js
await mcc.deleteDomain("example.com")
```
<a name="module_mailcow-api.MailcowApiClient+addDKIM"></a>

#### mailcowApiClient.addDKIM(dkim) ⇒ <code>Boolean</code>
Generates a DKIM domain key for a domain

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| dkim | <code>String</code> \| [<code>DKIM</code>](#DKIM) | A DKIM object or string |

**Example**  
```js
await mcc.addDKIM({
            domain: "example.com",
        })
        //This will generate a DKIM key for example.com on the mailcow server
```
<a name="module_mailcow-api.MailcowApiClient+getDKIM"></a>

#### mailcowApiClient.getDKIM(domain) ⇒ <code>Object</code>
Gets the DKIM key for a domain on the mailcow server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Object</code> - The DKIM public key and other parameters  

| Param | Type | Description |
| --- | --- | --- |
| domain | <code>String</code> | the domain name you want to get the key for |

**Example**  
```js
await mcc.getDKIM('example.com')
        //This will get the DKIM key for the domain example.com from the mailcow server
```
<a name="module_mailcow-api.MailcowApiClient+deleteDKIM"></a>

#### mailcowApiClient.deleteDKIM(domain) ⇒ <code>Boolean</code>
Deletes the DKIM key for a domain on the mailcow server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - true on success  

| Param | Type | Description |
| --- | --- | --- |
| domain | <code>Array</code> | the domain name/names you want to delete the key for |

**Example**  
```js
await mcc.deleteDKIM('example.com')
        //This will delete the DKIM key for the domain example.com from the mailcow server
```
<a name="module_mailcow-api.MailcowApiClient+addAndGetDKIM"></a>

#### mailcowApiClient.addAndGetDKIM(dkim) ⇒ <code>Object</code>
Generates a DKIM domain key for a domain and returns it

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Object</code> - DKIM key on success  

| Param | Type | Description |
| --- | --- | --- |
| dkim | <code>String</code> \| [<code>DKIM</code>](#DKIM) | A DKIM object or string |

**Example**  
```js
await mcc.addAndGetDKIM({
            domain: "example.com",
        })
        //This will generate a DKIM key for example.com on the mailcow server and return it
```
<a name="module_mailcow-api.MailcowApiClient+addDomainAdmin"></a>

#### mailcowApiClient.addDomainAdmin(domainAdmin) ⇒ <code>Object</code>
Adds a domain admin to the mailcow server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Object</code> - containing password username and domains on successfull creation  

| Param | Type | Description |
| --- | --- | --- |
| domainAdmin | [<code>DomainAdmin</code>](#DomainAdmin) | a domain admin object that has to contain at least the domains the admin should be able to control |

**Example**  
```js
await mcc.addDomainAdmin({
            domains: ['example.com', 'example.org']
        })
        //This will add an admin for the domains example.com and example.org and return their credentials
```
<a name="module_mailcow-api.MailcowApiClient+addMailbox"></a>

#### mailcowApiClient.addMailbox(mailbox) ⇒ <code>Object</code>
Adds a mailbox for a domain to the mailcow server

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Object</code> - the created mailbox  

| Param | Type | Description |
| --- | --- | --- |
| mailbox | [<code>Mailbox</code>](#Mailbox) | a Mailbox object that has to contain at least the domain for which the mailbox shall be created |

**Example**  
```js
await mcc.addMailbox({
            domain: 'example.com',
            name: 'Example'
        })
        //This will add a mailbox for the domain example.com and return it 
```
<a name="module_mailcow-api.MailcowApiClient+deleteMailbox"></a>

#### mailcowApiClient.deleteMailbox(mailboxes) ⇒ <code>Boolean</code>
Deletes a mailbox

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - true on success  

| Param | Type | Description |
| --- | --- | --- |
| mailboxes | <code>String</code> \| <code>Array</code> | complete name of the mailbox/mailboxes |

**Example**  
```js
await mcc.deleteMailbox("mail@example.com")
        //This will delete the mailbox mail@example.com
```
<a name="module_mailcow-api.MailcowApiClient+addAlias"></a>

#### mailcowApiClient.addAlias(address, goto) ⇒ <code>Boolean</code>
Adds an alias for a mailbox

**Kind**: instance method of [<code>MailcowApiClient</code>](#module_mailcow-api.MailcowApiClient)  
**Returns**: <code>Boolean</code> - true on success  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | alias address, for catchall use "@domain.tld" |
| goto | <code>String</code> | destination address, comma separated |

**Example**  
```js
await mcc.addAlias("@test.tld","mail@example.com")
        //This will catch all mail for the domain test.tld and put it in the mailbox mail@example.com
```
<a name="Domain"></a>

## Domain : <code>Object</code>
For all options check out [https://demo.mailcow.email/api/](https://demo.mailcow.email/api/)

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>String</code> |  | Name of the domain to add |
| [active] | <code>Number</code> | <code>1</code> | Whether the domain should be active or not |
| [aliases] | <code>Number</code> | <code>400</code> | Number of aliases allowed |
| [defquota] | <code>Number</code> | <code>3072</code> |  |
| [mailboxes] | <code>Number</code> | <code>10</code> |  |
| [maxquota] | <code>Number</code> | <code>10240</code> |  |
| [quota] | <code>Number</code> | <code>10240</code> |  |

**Example**  
```js
{
    active: 1,
    domain: "example.com",
    aliases: 400, // responding "object is not numeric" if missing is this a BUG? should be "aliases missing" if cant be omited anyway
    backupmx: 0,
    defquota: 3072,
    description: "Hello!",
    lang: "en",
    mailboxes: 10,
    maxquota: 10240,
    quota: 10240,
    relay_all_recipients: 0,
    rl_frame: "s",
    rl_value: 10
    }
```
<a name="DKIM"></a>

## DKIM : <code>Object</code>
Object representing a DKIM Key

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>String</code> |  | The domain which a key should be generated for |
| [dkim_selector] | <code>String</code> | <code>&#x27;dkim&#x27;</code> | The dkim selector |
| [key_size] | <code>2048</code> \| <code>1024</code> | <code>2048</code> | The size of the key |

**Example**  
```js
{
  "domain": "example.com",
  "dkim_selector": "dkim",
  "key_size": 2048
 }
```
<a name="DomainAdmin"></a>

## DomainAdmin : <code>Object</code>
Object representing a domain admin

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| domains | <code>Array</code> \| <code>String</code> |  | The domains/domain this admin should be able to access |
| [username] | <code>String</code> | <code>RANDOM</code> |  |
| [password] | <code>String</code> | <code>RANDOM</code> |  |
| [active] | <code>0</code> \| <code>1</code> | <code>1</code> |  |

**Example**  
```js
{
  "active": 1,
  "domains": "example.com",
  "password": "supersecurepw",
  "username": "testadmin"
}
```
<a name="Mailbox"></a>

## Mailbox : <code>Object</code>
Object representing a mailbox

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>String</code> |  | domain for wich the mailbox shall be created |
| [local_part] | <code>String</code> | <code>&quot;mail&quot;</code> | the local part of the mail address before the @ |
| [name] | <code>String</code> | <code>&quot;John Doe&quot;</code> | full name of the user |
| [password] | <code>String</code> | <code>RANDOM</code> | password for the user. if omitted one will be generated |
| [quota] | <code>Number</code> | <code>3072</code> | maximum size of the mailbox |
| [active] | <code>0</code> \| <code>1</code> | <code>1</code> | whether the mailbox is active or not |

**Example**  
```js
{
  "domain": "example.com",
  "local_part": "john.doe",
  "name": "John Doe",
  "password": "paulIstToll",
  "quota": 3072,
  "active": 1
}
```
