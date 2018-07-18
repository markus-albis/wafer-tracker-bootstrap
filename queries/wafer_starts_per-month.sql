SELECT 
    DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') AS StartMonth,
    COUNT(*)
FROM
    Wafer INNER JOIN (WaferLocation INNER JOIN WaferStatus ON WaferLocation.LocationID = WaferStatus.WaferLocationIDRef) ON Wafer.WaferID = WaferStatus.WaferIDRef
WHERE
    DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') > 2017.06
        AND DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') < 2018.07
        AND ((WaferLocation.LocationName) LIKE '%FEOL%'
        AND (WaferLocation.LocationName) LIKE '%Part 1%')
GROUP BY StartMonth;


