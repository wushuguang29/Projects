<?php
/*
 * @Author: your name
 * @Date: 2021-01-04 14:25:37
 * @LastEditTime: 2021-03-09 16:33:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\config\alipay.php
 */

return [
    //'WECHAR_APPID'       => 'wxe3a28c8a762691d9',//微信appid 测试
    //'WECHAR_APPSECRET'  => '5d8514528d227c39b70f61c4f593c7e2',//微信appsecret//测试
    'WECHAR_APPID'       => 'wx20da4aaa4bce5137',//微信appid 正式
    'WECHAR_APPSECRET'  => 'b55087484ed97550ae6a294c7563089d',//微信appsecret//正式
    'APPID'              => '2021002121607078',//支付宝appid
    'PRIVATE_KEY'       => 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYCj/GrdJfQbIRKrKS9rHmbVXI2bw/z1xvIg/sisFBq+hgRCt5+joPOEhfJ5d/1jBPFiBE8poCKfskaK+jFauat2wVbp4HoPAD9qwOEi++tr0UGHQtJtJL/THvKknqP5XVlFFqtbjXmfMc0VE6NhGj1hgoKreb1QOeFQ5IWVwRAYDBvqX6jurcf68sxi8KCFOXVFHx1aTWcjF/xnnOl8yhllQppwv0Nget1p/y0nn/OYR3PTDev3k/y0HVpCxurDJv1x8ElN5i8YsDNDG/XZtL+4OUjbS3hzcC9c639E85IYSXe1hVFJ0fGyhBP4VgREh+PJEf2+3p1YbdcMGPI5IpAgMBAAECggEAS2DpdatAHZIIopI0rsA4OzIB0e6BcnFwNnkAxBmW7uQ39WJW28a/ekRBPUv3xJ2AnfUuUoCk8mW16bstOQHJbo95urZ5CvcziAOIEgHaQgd/frMRBkG1CY+ibhzdQJH9y0IZi3pFBj+BVMxCJUYhQMUofOGQ3mWhwYJW7m+/QX5kp8LLlPp1gEP7Z3OdI/c+uBvonxI2Q8xfUmrHKEz3C2RK17k9Dv6Wc2OjVGlY2t4ABquFifwmV5OACbWTyrqHNTMaqnPWitE2GL91HxaxbKb4fVBVHnrix6e/R4b4pLg2nlL9YNxcnMm/MSjPdMpz8ZY/VJncmTtsn9Z0S/R4sQKBgQDaFi4U/s848Bl5u4wx5ThHenP08eCYL/N847Cnwm7GlxxtRlc42oZvnJ+4r/0znlH8aLBAb7qE78h7ts6c+UehG8INKbCQ+ccHG2Ngp4TrhMV/lRnwDlK4uK4FXGs4s2ODAY5iMVPX2g94GR8cNBTndVt/xUydq1kI2nyPlRH+cwKBgQCyeLP+sMHpv1IKngSIspDupqQpu3Oq/+o+P0mGYtu4qu0zB3WbAEF3t4FKOBzOFRZXM95PeO70OFwXe9rn+6lx+QQVf6KFlPl4UuypZSfBPi2/5Ab9PZRqmsA/OybCKHMhdZP+5vIs2hhbg84WbpK1v3ZheZ/pow1KhWdR8i8J8wKBgDi2uecl2JfTAJ0Co9O562fTNWKGoESTe7uHrsIBszMbyv2z5CzZz0opLfQmeC87RdDhHKy1IYk+niFmCdcSkIkaId2wcMVS32o+uhpBljR1Q7MJAETIRMTa6g5k2VFWfVNtTSzF7Srd/1XZGpkIBkOm5lOU6Ha8P5wozWm9d393AoGAPGrUNEJOQv07ntCDpGse2Uucg2wr6hWcjNoL3+yTiV6D0iSSUZiykP6UTDXWuoU0/OxYM/symYaC1ohdQO9XG3g7Q7PjpukZ0vvvliDiZm7QOgfNvekc10HwFvfFVTEwWIFfSomQLlLesAxctgdUryZTwwfTdNp342Rp57ne5rUCgYAos0zh9I1nYrU43IMFM+XkH5OujlJJ3UuQEGAlMwEHRSztEzy3+beQB40dJjsnFxjj/wobfShcHAmOanxcCOX5mlQ3GSPSL8Zoz+2plJy8XAnTQpEbQoZsvjTalJCmtd+4pnhS5B/PoyUhZVu3mK7eDHAf09tsV/70pHuJz9007w==',//应用私钥
    'ALI_PUBLIC_KEY'    => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv0/PCYQrDsOvpikPcCjOnIgaz7ksnSN25HJzBgU6IMKfSE3xe7/OH6jjDHYXKvu4hBhIlQk/uo8rXY7R94CfoOtgR+lwXdRpEqH9VSiq6MEG0o7rvKELJjezVqMwbC55JwS/MazD4Da4K5Dqrli0gPjxLnYXc0EDLsXO6LZrcLiSfnfNnExikRtcN4db6gAzOx2PPTc8CaBJq136hieJAvaU6yU4UQYxd2Hw8PD86p2NGtPPZbZddeaWZNwcJASO6NRCOi9S0yJ0OTBYtS/THRiCLjB9sAaPdK2z0OuvZG69+GqnNBv9cDIWlZdcBlMgK819eKwKNGJiPF7CK0QIswIDAQAB',//支付宝公钥
];