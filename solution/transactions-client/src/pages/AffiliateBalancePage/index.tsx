import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatVendorName, formatToCurrency } from '../../utils/content';
import { BalanceService } from '../../reducers/balance/balance.service';
import './AffiliateBalancePage.css';

const AffiliateBalancePage: React.FC = () => {
  const [affiliateBalance, setAffiliateBalance] = useState(0);
  const { affiliateName } = useParams();

  useEffect(() => {
    if (affiliateName) {
      const fetchAffiliateBalance = async () => {
        const response = await BalanceService.getBalanceByAffiliate(affiliateName);

        setAffiliateBalance(response.data);
      }

      fetchAffiliateBalance();
    }
  }, [affiliateName]);

  return (
    <div className="affiliate-balance-page-wrapper">
      <h1 className="affiliate-balance-title">{formatVendorName(affiliateName || '')}</h1>

      <div>
        <div className="affiliate-balance-subtitle-wrapper">
          <h3 className="text">Total balance:</h3>
        </div>
        <div className="affiliate-balance-value-wrapper">
          <h3 className="text">{formatToCurrency(affiliateBalance)}</h3>
        </div>
      </div>
    </div>
  )
};

export default AffiliateBalancePage;