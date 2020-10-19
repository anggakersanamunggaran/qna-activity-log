# qna-activity-log
Simple Activity log for qna Proctoring Astrnt

## Version
0.0.4

## Description
Simple web event tracker for astronaut web application

## Install
```
// Format
npm install "git+https://github.com/anggakersanamunggaran/qna-activity-log.git#<branch|tag>"

// sample install with tag 0.0.4
npm install "git+https://github.com/anggakersanamunggaran/qna-activity-log.git#0.0.4"
```

## Sample usage

#### Import
```
import * as Actlog from "qna-activity-log"
```

#### First time initialization (Ideally on the intro page)
```
const env = 'beta'
const baseParam = {
    interview_code: 'TEST-123', // string
    candidate_id: 1111, // number
    job_id: 2222, // number
    company_id: 3333, // number
    isProctoring: 0,// 0 not active 1 is active
}

Actlog.initialize(env, baseParam);
```

#### Track the event
```
let act_log = {
      activity: "Enter QNA",
      status: "online"
};

Actlog.recordEvent(act_log);
```

#### Promise support
```
...
Actlog.recordEvent(params)
    .then(result => {
        console.log(`result : ${result}`)
    })
    .catch(err => {
        console.log(`error : ${err}`)
    })
```

#### Credit
- Checking
- Thinking
- Swimming
- Fast typing
- Awesome
