const Accounts = require('../../models/accountlist')
const sequelize = require('sequelize')
const Op = sequelize.Op

// date 형식은 YYYY-MM-DD
// 가계부 작성
const WriteAccount = async (data) => {
  try {
    const { userIndex, date, bigCategory, smallCategory, card, cost } = data
    await Accounts.create({
      userIndex,
      date,
      bigCategory,
      smallCategory,
      card,
      cost
    })
    return true
  } catch (E) {
    return false
  }
}

// 특정 가계부 확인
const SelectAccount = async (data) => {
  const { index, userIndex } = data
  const account = await Accounts.findOne({
    where: {
      index,
      userIndex
    }
  })
  if (account) {
    return true
  } else {
    return false
  }
}

// 가계부 수정
const ChangeAccount = async (data) => {
  try {
    const { index, userIndex, date, bigCategory, smallCategory, card, cost } =
      data
    await Accounts.update(
      {
        bigCategory,
        smallCategory,
        card,
        cost,
        date
      },
      {
        where: { userIndex, index }
      }
    )
    return true
  } catch (E) {
    return false
  }
}

// 가계부 삭제
const RemoveAccount = async (data) => {
  try {
    const { index } = data
    await Accounts.destroy({
      where: { index }
    })
    return true
  } catch (E) {
    return false
  }
}

// 현금 사용 금액
const CashCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'cash',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 신한 카드 사용 금액
const ShinhanCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'shinhan',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 삼성 카드 사용금액
const SamsungCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'samsung',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 현대 카드 사용금액
const HyundaiCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'hyundai',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 우리 카드 사용금액
const WooriCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'woori',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 롯데 카드 사용금액
const LotteCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'lotte',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// kb 카드 사용금액
const KbCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'kb',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 수익 금액
const RevenueCost = async (data) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'revenue',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 날짜 별 사용 카드별 상세 목록 확인
const UseCardList = async (data) => {
  const { userIndex, card, date } = data
  const total = await Accounts.findAll({
    where: {
      userIndex,
      card,
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  return total
}

module.exports = {
  WriteAccount,
  SelectAccount,
  ChangeAccount,
  RemoveAccount,
  CashCost,
  ShinhanCost,
  SamsungCost,
  HyundaiCost,
  WooriCost,
  LotteCost,
  KbCost,
  RevenueCost,
  UseCardList
}
