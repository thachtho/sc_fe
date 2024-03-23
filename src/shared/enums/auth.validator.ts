const notRequired = () => {
    return `không được để trống!.`
}

const notTooShort = () => {
    return `quá ngắn!.`
}

const notTooLong = () => {
    return `quá dài!.`
}

export const messageErrorValidate = {
    nickname: {
        required: `NickName ${notRequired()}`,
        maxLength: `NickName ${notTooLong()}`,
        minLength: `NickName ${notTooShort()}`
    },
    password: {
        required: `Password ${notRequired()}`,
        maxLength: `Password ${notTooLong()}`,
        minLength: `Password ${notTooShort()}`
    },
    fullname: {
        required: `Họ và tên ${notRequired()}`,
        maxLength: `Họ và tên ${notTooLong()}`,
        minLength: `Họ và tên ${notTooShort()}`
    }
}

