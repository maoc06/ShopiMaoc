function cc_format(value: string) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (var i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
        return parts.join('-')
    } else {
        return value
    }
}

function cc_expiry(value: string) {
    var re1 = new RegExp("[0|1][0-9]\/[1-2][0-9]{3}");
    var re2 = new RegExp("^[1[3-9]]");
    var re3 = new RegExp("^00");
    return re1.test(value) && (!re2.test(value)) && (!re3.test(value));
}

export { cc_format, cc_expiry };