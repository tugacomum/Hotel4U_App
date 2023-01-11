import { ActivityIndicator } from 'react-native'
import React from 'react'

import COLORS from '../../consts/colors'

export const Loader = ({ size = "small" }) => {
    return (
        <ActivityIndicator size={size} color={COLORS.primary}  />
    )
}