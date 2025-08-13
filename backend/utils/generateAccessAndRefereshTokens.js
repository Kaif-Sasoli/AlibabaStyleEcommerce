//* Generate Access & Refresh token

export const generateAccessAndRefereshTokens = async (user) =>{
    try {
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        console.error(error)
        throw new Error("Something went wrong while generating referesh and access token")
    }
}
