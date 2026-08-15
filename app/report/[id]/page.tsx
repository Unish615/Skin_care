'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DigitalSoftcopyReportView } from '../../../components/DigitalSoftcopyReportView';
import { INITIAL_ANALYSIS_MOCK } from '../../../data/skincareData';
import { AnalysisResult, SkinType } from '../../../types';

export default function ReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const reportId = (params?.id as string) || 'nyoria-88492';
  const queryName = searchParams.get('name');
  const queryScore = searchParams.get('score');
  const queryType = searchParams.get('type');

  const [patientName, setPatientName] = useState<string>(queryName || 'ANONYMOUS CLINICAL PATIENT');
  const [reportResult, setReportResult] = useState<AnalysisResult>({
    ...INITIAL_ANALYSIS_MOCK,
    id: reportId,
    overallScore: queryScore ? parseInt(queryScore, 10) || 87 : 87,
    detectedSkinType: (queryType as SkinType) || INITIAL_ANALYSIS_MOCK.detectedSkinType
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedReportStr = localStorage.getItem(`nyoria_report_${reportId}`) || localStorage.getItem('nyoria_latest_report');
        if (savedReportStr) {
          const parsed = JSON.parse(savedReportStr);
          if (parsed?.result) {
            setReportResult({
              ...parsed.result,
              id: reportId,
              overallScore: queryScore ? parseInt(queryScore, 10) || parsed.result.overallScore : parsed.result.overallScore,
              detectedSkinType: queryType ? (queryType as SkinType) : parsed.result.detectedSkinType
            });
          }
          if (parsed?.patientName && !queryName) {
            setPatientName(parsed.patientName);
          }
        } else {
          setReportResult(prev => ({
            ...prev,
            overallScore: queryScore ? parseInt(queryScore, 10) || prev.overallScore : prev.overallScore,
            detectedSkinType: queryType ? (queryType as SkinType) : prev.detectedSkinType
          }));
        }
      } catch (err) {}
    }
  }, [reportId, queryName, queryScore, queryType]);

  return (
    <DigitalSoftcopyReportView
      result={reportResult}
      patientName={queryName || patientName}
    />
  );
}
